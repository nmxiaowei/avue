export default function() {
    return {
        props: {
            tableLoading: {
                type: Boolean,
                default: false,
            },
            page: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            beforeOpen: Function,
            beforeClose: Function,
            uploadBefore: Function,
            uploadAfter: Function,
            rowClassName: Function,
            cellClassName: Function,
            headerCellClassName: Function,
            spanMethod: Function,
            summaryMethod: Function,
            data: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            onLoad(page) {
                this.$emit('on-load', page);
            },
            refreshChange(params) {
                this.$emit('refresh-change', params);
            },
            searchReset() {
                this.$emit('search-reset');
            },
            sizeChange(val) {
                this.$emit('size-change', val);
            },
            dateChange(val) {
                this.$emit('date-change', val);
            },
            currentChange(val) {
                this.$emit('current-change', val);
            },
            currentRowChange(currentRow, oldCurrentRow) {
                this.$emit('current-row-change', currentRow, oldCurrentRow);
            },
            selectionChange(val) {
                this.$emit('selection-change', val);
            },
            sortChange(val) {
                this.$emit('sort-change', val);
            },
            searchChange(val) {
                this.$emit('search-change', val);
            },
            rowDblclick(row, event) {
                this.$emit('row-dblclick', row, event);
            },
            rowClick(row, event, column) {
                this.$emit('row-click', row, event, column);
            },
            rowDel(row, index) {
                this.$emit('row-del', row, index);
            },
            rowSave(row, done, loading) {
                this.$emit('row-save', row, done, loading);
            },
            rowUpdate(row, index, done, loading) {
                this.$emit('row-update', row, index, done, loading);
            },
            rowAdd() {
                this.$refs.crud.rowAdd();
            },
            rowEdit(row, index) {
                this.$refs.crud.rowEdit(row, index);
            }
        }
    }
}