/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
const STORAGE_PREFIX = 'AVUE_COLUMN_STATE:';
const STATE_KEYS = ['hide', 'fixed', 'filters', 'sortable', 'width'];
const getStorage = (type = 'localStorage') => {
    if (typeof window === 'undefined')
        return null;
    const storage = type === 'sessionStorage' ? window.sessionStorage : window.localStorage;
    return storage || null;
};
const normalizeColumns = (columns = []) => {
    if (Array.isArray(columns))
        return columns;
    return Object.keys(columns).map((prop) => ({
        ...columns[prop],
        prop: columns[prop].prop || prop,
    }));
};
const getColumnStateStorageKey = (key) => {
    return `${STORAGE_PREFIX}${key}`;
};
const createColumnState = (columns = []) => {
    return {
        version: 1,
        columns: normalizeColumns(columns)
            .filter((column) => column && column.prop)
            .map((column, index) => {
            const item = {
                prop: column.prop,
                order: index,
            };
            STATE_KEYS.forEach((key) => {
                if (column[key] !== undefined)
                    item[key] = column[key];
            });
            return item;
        }),
    };
};
const applyColumnState = (columns = [], state) => {
    const columnList = normalizeColumns(columns);
    if (!state || !Array.isArray(state.columns))
        return columnList;
    const stateMap = state.columns.reduce((map, item) => {
        if (item && item.prop)
            map[item.prop] = item;
        return map;
    }, {});
    columnList.forEach((column) => {
        const item = stateMap[column.prop];
        if (!item)
            return;
        STATE_KEYS.forEach((key) => {
            if (item[key] !== undefined)
                column[key] = item[key];
        });
    });
    columnList.sort((a, b) => {
        var _a, _b;
        const aOrder = (_a = stateMap[a.prop]) === null || _a === void 0 ? void 0 : _a.order;
        const bOrder = (_b = stateMap[b.prop]) === null || _b === void 0 ? void 0 : _b.order;
        if (aOrder === undefined && bOrder === undefined)
            return 0;
        if (aOrder === undefined)
            return 1;
        if (bOrder === undefined)
            return -1;
        return aOrder - bOrder;
    });
    return columnList;
};
const loadColumnState = (key, storageType) => {
    const storage = getStorage(storageType);
    if (!storage || !key)
        return null;
    try {
        const value = storage.getItem(getColumnStateStorageKey(key));
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        return null;
    }
};
const saveColumnState = (key, state, storageType) => {
    const storage = getStorage(storageType);
    if (!storage || !key)
        return;
    try {
        storage.setItem(getColumnStateStorageKey(key), JSON.stringify(state));
    }
    catch (error) { }
};
const removeColumnState = (key, storageType) => {
    const storage = getStorage(storageType);
    if (!storage || !key)
        return;
    try {
        storage.removeItem(getColumnStateStorageKey(key));
    }
    catch (error) { }
};

export { applyColumnState, createColumnState, getColumnStateStorageKey, loadColumnState, removeColumnState, saveColumnState };
