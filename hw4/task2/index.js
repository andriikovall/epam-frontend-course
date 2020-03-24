(function () {

  const btnAdd = document.getElementById('btn-add');
  const btnBuild = document.getElementById('btn-build');
  const table = document.getElementById('table-main');
  const groupTemplate = document.getElementById('row-template');
  const diagram = document.getElementById('diagram');

  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    //@todo add modal for input
    addGroup({ name: 'afdsf', count: Math.trunc(Math.random() * 100) });
  });

  btnBuild.addEventListener('click', e => {
    rebuildDiagram();
  })

  function rebuildDiagram() {
    const data = getDiagramData();
    const diagramCols = getDigramColums(data);
    clearChildren(diagram);
    diagram.append(...diagramCols);
  }

  table.addEventListener('input', (e) => {
    const datasetRef = e.target.parentNode.dataset;
    datasetRef[e.target.dataset.key] = e.target.innerText;
    rebuildDiagram();
  })

  function addGroup({ name, count }) {
    const cols = groupTemplate.content.querySelectorAll('td');

    cols[0].dataset[cols[0].firstChild.dataset.key] = name;
    cols[0].firstChild.innerText = name;

    cols[1].dataset[cols[1].firstChild.dataset.key] = count;
    cols[1].firstChild.innerText = count;

    const clonedRow = cols[0].parentNode.cloneNode(true);

    table.appendChild(clonedRow);
  }

  function getDiagramData() {
    const rows = [...table.querySelectorAll('tr')];
    const data = rows.map(row => {
      const rowData = [...row.querySelectorAll('td')]
        .map(dataEl => ({ ...dataEl.dataset }));
      return rowData;
    });
    console.log(data);
    return data.filter(row => row.length)
      .map(row => row.reduce((acc, curr) => ({ ...acc, ...curr })));
  }

  function clearChildren(elem) {
    while (elem.firstChild) elem.removeChild(elem.lastChild);

    // я думаю так проще
    // elem.innerHTML = ''; 
  }

  const observer = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

      if (mutation.type === 'characterData') {
        mutation.target.innerText = mutation.target.textContent;
      }
    });
  });
  observer.observe(table, { attributes: true, characterData: true, subtree: true });

})();