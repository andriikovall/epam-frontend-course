const getDigramColums = (function () {
  const maxHeight = 100;

  function addHeightToValues(rows) {
    const maxRowCount = rows.reduce((acc, curr) => curr.count >= acc ? curr.count : acc, 0);
    return rows.map(row => ({ ...row, height: maxHeight / maxRowCount * row.count }));
  }

  return function (rows, colors = []) {
    const cols = addHeightToValues(rows);
    const blockElems = cols.map(({ height, name, count }) => getDiagramColumn(height, name, count));


    for (let i = 0; i < colors.length && i < blockElems.length; i++) {
      const rect = blockElems[i].firstChild;
      rect.style.backgroundColor = colors[i];
    }

    return blockElems;
  }
})();