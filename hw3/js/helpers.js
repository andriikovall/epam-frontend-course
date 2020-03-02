function capitalizeFirstLetter(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}


function randInt(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const contentBox = document.getElementById('output');

function output(str) {
  contentBox.innerHTML += str.toString() + '\n';
  contentBox.scrollTop = contentBox.scrollHeight
}

function clearOutput() {
  contentBox.innerHTML = '';
}

clearOutput();
