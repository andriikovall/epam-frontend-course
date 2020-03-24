const getDigramColums = (function(){
  const maxHeight = 200;

  function addHeightToValues(rows) {
    const maxRowCount = rows.reduce((acc, curr) => curr.count > acc ? curr.count : acc, 0);
    return rows.map(row => ({ ...row, height: maxHeight / maxRowCount * row.count }));
  }

  return function(rows) {
    const cols = addHeightToValues(rows);
    const blockElems = cols.map(({ height, name }) => getDiagramColumn(height, name));
    return blockElems;
  }
})();