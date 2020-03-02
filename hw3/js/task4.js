const arr = [
  { value: 100, type: 'USD' },
  { value: 215, type: 'EUR' },
  { value: 7, type: 'EUR' },
  { value: 99, type: 'USD' },
  { value: 354, type: 'USD' },
  { value: 12, type: 'EUR' },
  { value: 77, type: 'USD' },
];


function task4() {
  output('4-1: ' + task4_1());
  output('4-2: ' + JSON.stringify(task4_2(), null, ' '));
}

function task4_1() {
  return arr.filter(item => item.value < 100 && item.type === 'USD')
            .map(item => item.value)
            .reduce((accum, curr) => accum + curr);
}

function task4_2() {
  return arr.filter(item => item.type === 'EUR')
            .map(item => ({ ...item, value: item.value * 2 }));
}

