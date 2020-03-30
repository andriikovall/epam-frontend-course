(function () {

  const btnAdd = document.getElementById('btn-add');
  const table = document.getElementById('table-main');
  const groupTemplate = document.getElementById('row-template');
  const diagram = document.getElementById('diagram');

  [
    { name: 'KP-83', count: Math.trunc(Math.random() * 100) }, 
    { name: 'KP-93', count: Math.trunc(Math.random() * 100) }, 
    { name: 'KP-92', count: Math.trunc(Math.random() * 100) }, 
    { name: 'KP-91', count: Math.trunc(Math.random() * 100) }, 
  ].forEach(addGroup);
  

  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    addGroup({ name: 'Group name', count: Math.trunc(Math.random() * 100) });
  });

  diagram.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.classList.contains('diagram__rect')) {
      target.nextSibling.innerText = target.parentNode.dataset.count;
    }
  });

  diagram.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.classList.contains('diagram__rect')) {
      target.nextSibling.innerText = target.parentNode.dataset.name;
    }
  });

  function rebuildDiagram() {
    const data = getDiagramData().map(val => ({ ...val, count: parseInt(val.count) }));
    const colors = getDiagramColors();
    const diagramCols = getDigramColums(data, colors);
    clearChildren(diagram);
    diagram.append(...diagramCols);
  }

  table.addEventListener('input', (e) => {
    const datasetRef = e.target.parentNode.dataset;
    datasetRef[e.target.dataset.key] = e.target.innerText;
    rebuildDiagram();
  });




  function addGroup({ name, count }) {
    const cols = groupTemplate.content.querySelectorAll('td');

    cols[0].dataset[cols[0].firstChild.dataset.key] = name;
    cols[0].firstChild.innerText = name;

    cols[1].dataset[cols[1].firstChild.dataset.key] = count;
    cols[1].firstChild.innerText = count;


    const clonedRow = cols[0].parentNode.cloneNode(true);

    clonedRow.querySelector('.btn').addEventListener('click', onDeleteClicked);

    table.appendChild(clonedRow);
    rebuildDiagram();
  }

  function getDiagramData() {
    const rows = [...table.querySelectorAll('tr')];
    const data = rows.map(row => {
      const rowData = [...row.querySelectorAll('td')]
        .map(dataEl => ({ ...dataEl.dataset }));
      return rowData;
    });
    return data.filter(row => row.length)
      .map(row => row.reduce((acc, curr) => ({ ...acc, ...curr })));
  }

  function getDiagramColors() {
    const cols = document.querySelectorAll('.diagram__rect');
    const colors = [];
    for (const col of cols) {
      const colorValue = getComputedStyle(col).backgroundColor;
      colors.push(colorValue);
    }
    return colors;
  }

  function clearChildren(elem) {
    while (elem.firstChild) elem.removeChild(elem.lastChild);

    // я думаю так проще
    // elem.innerHTML = ''; 
  }


  function onDeleteClicked(e) {
    const tableRowEl = e.target.parentNode.parentNode;
    tableRowEl.parentNode.removeChild(tableRowEl);
    rebuildDiagram();
  }

})();