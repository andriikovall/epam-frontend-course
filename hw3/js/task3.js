const task3 = (function() {

  function printBottle(count) {
    if (count <= 0) {
      output('Жодної');
      return;
    }
    output(`${count} пляшок стоїть на стіні, одна упала і залишилось`);
    setTimeout(() => printBottle(count - 1), 200);
  }

  return function () {
    let bottlesCount = parseInt(prompt('Уведіть кількість пляшок')) || -1;

    if (bottlesCount <= 0) {
      alert('Неправильна кількість пляшок');
    }

    printBottle(bottlesCount);
  };
})();

