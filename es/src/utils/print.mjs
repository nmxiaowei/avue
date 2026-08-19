/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
const getElement = (source) => {
    if (source instanceof HTMLElement)
        return source;
    if (source && source.$el instanceof HTMLElement)
        return source.$el;
    return undefined;
};
const escapeHtml = (value) => {
    return value.replace(/[&<>"']/g, (char) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return map[char];
    });
};
const getText = (element) => {
    return (element.textContent || '').replace(/\s+/g, ' ').trim();
};
const toAbsoluteUrl = (url) => {
    try {
        return new URL(url, document.baseURI).href;
    }
    catch (_a) {
        return url;
    }
};
const getCellMatrix = (row) => {
    const matrix = [];
    let index = 0;
    Array.from(row.cells).forEach((cell) => {
        while (matrix[index])
            index++;
        const colSpan = Math.max(cell.colSpan || 1, 1);
        for (let offset = 0; offset < colSpan; offset++) {
            matrix[index + offset] = cell;
        }
        index += colSpan;
    });
    return matrix;
};
const getHeaderColumns = (table) => {
    var _a;
    const rows = Array.from(((_a = table.tHead) === null || _a === void 0 ? void 0 : _a.rows) || table.rows);
    const matrix = [];
    rows.forEach((row, rowIndex) => {
        let columnIndex = 0;
        Array.from(row.cells).forEach((cell) => {
            while (matrix[rowIndex] && matrix[rowIndex][columnIndex])
                columnIndex++;
            const colSpan = Math.max(cell.colSpan || 1, 1);
            const rowSpan = Math.max(cell.rowSpan || 1, 1);
            for (let rowOffset = 0; rowOffset < rowSpan; rowOffset++) {
                const targetRow = rowIndex + rowOffset;
                if (!matrix[targetRow])
                    matrix[targetRow] = [];
                for (let colOffset = 0; colOffset < colSpan; colOffset++) {
                    matrix[targetRow][columnIndex + colOffset] = cell;
                }
            }
            columnIndex += colSpan;
        });
    });
    const lastRow = matrix[matrix.length - 1] || [];
    return lastRow
        .map((cell, index) => (cell ? { index, cell } : undefined))
        .filter((column) => Boolean(column));
};
const isControlColumn = (cell) => {
    return (cell.classList.contains('el-table-column--selection') ||
        cell.classList.contains('el-table-column--expand') ||
        cell.classList.contains('el-table__expand-column') ||
        Boolean(cell.querySelector('.el-checkbox, .el-radio')));
};
const isActionColumn = (column, rows, options) => {
    var _a;
    const label = getText(column.cell);
    if ((_a = options.hiddenColumnLabels) === null || _a === void 0 ? void 0 : _a.includes(label))
        return true;
    return rows.some((row) => { var _a; return Boolean((_a = row[column.index]) === null || _a === void 0 ? void 0 : _a.querySelector('.avue-crud__menu')); });
};
const replaceFieldValue = (element) => {
    element.querySelectorAll('input, textarea, select').forEach((field) => {
        var _a;
        let value = '';
        if (field instanceof HTMLSelectElement) {
            value = ((_a = field.selectedOptions[0]) === null || _a === void 0 ? void 0 : _a.text) || '';
        }
        else if (field instanceof HTMLInputElement) {
            value = field.type === 'checkbox' || field.type === 'radio' ? (field.checked ? '√' : '') : field.value;
        }
        else if (field instanceof HTMLTextAreaElement) {
            value = field.value;
        }
        field.replaceWith(document.createTextNode(value));
    });
};
const getCellHtml = (cell) => {
    const content = cell.querySelector('.cell') || cell;
    const clone = content.cloneNode(true);
    replaceFieldValue(clone);
    clone
        .querySelectorAll('.no-print, script, style, button, .el-button, .el-checkbox, .el-radio, .el-switch, .caret-wrapper, [data-print-ignore="true"]')
        .forEach((element) => element.remove());
    clone.querySelectorAll('*').forEach((element) => {
        Array.from(element.attributes)
            .filter((attribute) => attribute.name.toLowerCase().startsWith('on'))
            .forEach((attribute) => element.removeAttribute(attribute.name));
    });
    clone.querySelectorAll('a').forEach((link) => {
        link.removeAttribute('href');
        link.style.color = 'inherit';
        link.style.textDecoration = 'none';
    });
    clone.querySelectorAll('img').forEach((image) => {
        const source = image.currentSrc || image.getAttribute('src');
        if (source)
            image.setAttribute('src', toAbsoluteUrl(source));
        image.removeAttribute('srcset');
        image.style.maxWidth = '100%';
        image.style.maxHeight = '80px';
        image.style.height = 'auto';
    });
    return clone.innerHTML.trim() || escapeHtml(getText(content));
};
const getBodyRows = (table) => {
    const tableRows = [];
    Array.from(table.tBodies).forEach((body) => {
        tableRows.push(...Array.from(body.rows));
    });
    return tableRows
        .filter((row) => {
        return !row.classList.contains('el-table__expanded-row') && !row.querySelector('.el-table__expanded-cell');
    })
        .map(getCellMatrix);
};
const getTableTitle = (root, options) => {
    if (options.title)
        return options.title;
    const crud = root.closest('.avue-crud');
    const title = crud === null || crud === void 0 ? void 0 : crud.querySelector('h1, h2, h3, h4, h5, h6');
    return title ? getText(title) : '';
};
/**
 * 将 Element Plus 表格转为独立的静态 HTML，避免固定列、滚动容器和页面样式影响打印结果。
 */
const buildTablePrintHtml = (source, options = {}) => {
    const root = getElement(source);
    const tableRoot = (root === null || root === void 0 ? void 0 : root.matches('.el-table')) ? root : root === null || root === void 0 ? void 0 : root.querySelector('.el-table');
    const headerTable = tableRoot === null || tableRoot === void 0 ? void 0 : tableRoot.querySelector('.el-table__header-wrapper table');
    const bodyTable = tableRoot === null || tableRoot === void 0 ? void 0 : tableRoot.querySelector('.el-table__body-wrapper table');
    if (!root || !headerTable || !bodyTable)
        return undefined;
    const rows = getBodyRows(bodyTable);
    const columns = getHeaderColumns(headerTable).filter((column) => {
        if (isControlColumn(column.cell))
            return false;
        if (isActionColumn(column, rows, options))
            return false;
        if (getCellHtml(column.cell))
            return true;
        return rows.some((row) => Boolean(row[column.index] && getCellHtml(row[column.index])));
    });
    if (columns.length === 0)
        return undefined;
    const title = getTableTitle(root, options);
    const titleHtml = title ? `<h1 class="avue-print__title">${escapeHtml(title)}</h1>` : '';
    const headerHtml = columns
        .map((column) => `<th>${getCellHtml(column.cell)}</th>`)
        .join('');
    const bodyHtml = rows.length
        ? rows
            .map((row) => {
            return `<tr>${columns
                .map((column) => `<td>${row[column.index] ? getCellHtml(row[column.index]) : ''}</td>`)
                .join('')}</tr>`;
        })
            .join('')
        : `<tr><td class="avue-print__empty" colspan="${columns.length}">${escapeHtml(options.emptyText || '暂无数据')}</td></tr>`;
    const documentTitle = options.documentTitle || title || document.title;
    return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(documentTitle)}</title>
    <style>
      @page { margin: 12mm; }
      * { box-sizing: border-box; }
      body { margin: 0; color: #1f2937; background: #fff; font: 12px/1.5 "Microsoft YaHei", Arial, sans-serif; }
      .avue-print__title { margin: 0 0 16px; color: #111827; font-size: 20px; text-align: center; }
      table { width: 100%; border-collapse: collapse; table-layout: auto; }
      thead { display: table-header-group; }
      tr { break-inside: avoid; page-break-inside: avoid; }
      th, td { padding: 8px 10px; border: 1px solid #dcdfe6; vertical-align: middle; word-break: break-word; overflow-wrap: anywhere; }
      th { color: #fff; font-weight: 600; text-align: center; background: #2563eb; }
      tbody tr:nth-child(even) { background: #f8fafc; }
      td img { display: inline-block; max-width: 100%; max-height: 80px; object-fit: contain; vertical-align: middle; }
      .avue-print__empty { padding: 32px; color: #909399; text-align: center; }
    </style>
  </head>
  <body>
    ${titleHtml}
    <table>
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  </body>
</html>`;
};

export { buildTablePrintHtml };
