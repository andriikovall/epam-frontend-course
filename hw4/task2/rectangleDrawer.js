const getDiagramColumn = (function(){

  function isColor(colorStr) {
    const s = new Option().style;
    s.color = colorStr;
    return s.color == colorStr;
  }
  
  function getRandomColourInHex() {
    return Math.floor(Math.random()*16777215).toString(16);
  } 
  
  return function getDiagramColumn(height, name, count, color = getRandomColourInHex()) {
    const rect = document.createElement('div');
    rect.classList.add('diagram__rect');
    rect.style.height = `${height}px`;
    rect.style.width = '100%';
    rect.style.backgroundColor = isColor(color) ? color : '#' + getRandomColourInHex();
    
    const nameEl = document.createElement('p');
    nameEl.classList.add('text-center');
    nameEl.innerText = name;
    
    const col = document.createElement('div');
    col.dataset.name = name;
    col.dataset.count = count;
    col.classList.add('diagram__col');
    col.classList.add('mx-2');
    col.append(rect, nameEl);
    return col;
  };
})();
