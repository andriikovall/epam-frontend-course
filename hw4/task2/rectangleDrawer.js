const getDiagramColumn = (function(){

  function isColor(colorStr) {
    const s = new Option().style;
    s.color = colorStr;
    return s.color == colorStr;
  }
  
  function getRandomColourInHex() {
    return Math.floor(Math.random()*16777215).toString(16);
  } 
  
  return function getDiagramColumn(height, name, color = getRandomColourInHex()) {
    const rect = document.createElement('div');
    rect.dataset.name = name;
    rect.style.height = `${height}px`;
    rect.style.width = '100%';
    rect.style.background = isColor(color) ? color : '#' + getRandomColourInHex();
    
    const nameEl = document.createElement('p');
    nameEl.innerText = name;

    const col = document.createElement('div');
    col.classList.add('diagram__col');
    col.classList.add('mx-2');
    col.append(rect, nameEl);
    return col;
  };
})();
