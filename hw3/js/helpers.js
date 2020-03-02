function capitalizeFirstLetter(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}


function randInt(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
