type AnyRecord = Record<string, any>;

const STORAGE_PREFIX = 'AVUE_COLUMN_STATE:';
const STATE_KEYS = ['hide', 'fixed', 'filters', 'sortable', 'width'] as const;

export interface AvueColumnStateItem {
  prop: string;
  order: number;
  hide?: boolean;
  fixed?: boolean | string;
  filters?: any;
  sortable?: boolean | string;
  width?: number | string;
}

export interface AvueColumnState {
  version: number;
  columns: AvueColumnStateItem[];
}

const getStorage = (type = 'localStorage') => {
  if (typeof window === 'undefined') return null;
  const storage = type === 'sessionStorage' ? window.sessionStorage : window.localStorage;
  return storage || null;
};

const normalizeColumns = (columns: AnyRecord[] | AnyRecord = []) => {
  if (Array.isArray(columns)) return columns;
  return Object.keys(columns).map((prop) => ({
    ...columns[prop],
    prop: columns[prop].prop || prop,
  }));
};

export const getColumnStateStorageKey = (key: string) => {
  return `${STORAGE_PREFIX}${key}`;
};

export const createColumnState = (columns: AnyRecord[] | AnyRecord = []): AvueColumnState => {
  return {
    version: 1,
    columns: normalizeColumns(columns)
      .filter((column) => column && column.prop)
      .map((column, index) => {
        const item: AvueColumnStateItem = {
          prop: column.prop,
          order: index,
        };
        STATE_KEYS.forEach((key) => {
          if (column[key] !== undefined) item[key] = column[key];
        });
        return item;
      }),
  };
};

export const applyColumnState = (
  columns: AnyRecord[] | AnyRecord = [],
  state?: AvueColumnState | null,
) => {
  const columnList = normalizeColumns(columns);
  if (!state || !Array.isArray(state.columns)) return columnList;

  const stateMap = state.columns.reduce((map, item) => {
    if (item && item.prop) map[item.prop] = item;
    return map;
  }, {} as Record<string, AvueColumnStateItem>);

  columnList.forEach((column) => {
    const item = stateMap[column.prop];
    if (!item) return;
    STATE_KEYS.forEach((key) => {
      if (item[key] !== undefined) column[key] = item[key];
    });
  });

  columnList.sort((a, b) => {
    const aOrder = stateMap[a.prop]?.order;
    const bOrder = stateMap[b.prop]?.order;
    if (aOrder === undefined && bOrder === undefined) return 0;
    if (aOrder === undefined) return 1;
    if (bOrder === undefined) return -1;
    return aOrder - bOrder;
  });

  return columnList;
};

export const loadColumnState = (key: string, storageType?: string) => {
  const storage = getStorage(storageType);
  if (!storage || !key) return null;
  try {
    const value = storage.getItem(getColumnStateStorageKey(key));
    return value ? (JSON.parse(value) as AvueColumnState) : null;
  } catch (error) {
    return null;
  }
};

export const saveColumnState = (
  key: string,
  state: AvueColumnState,
  storageType?: string,
) => {
  const storage = getStorage(storageType);
  if (!storage || !key) return;
  try {
    storage.setItem(getColumnStateStorageKey(key), JSON.stringify(state));
  } catch (error) {}
};

export const removeColumnState = (key: string, storageType?: string) => {
  const storage = getStorage(storageType);
  if (!storage || !key) return;
  try {
    storage.removeItem(getColumnStateStorageKey(key));
  } catch (error) {}
};
