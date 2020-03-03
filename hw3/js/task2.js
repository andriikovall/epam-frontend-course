const task2 = (function(){
  function getStringForPifagorianRow(row, spacingNumber, preferableLength = -1) {
    const space = ' '.repeat(spacingNumber);
    const numbersWithoutPaddings = row.join(space);
    if (preferableLength <= 0) {
      return numbersWithoutPaddings;
    }
    const padding = (preferableLength - numbersWithoutPaddings.length) / 2;
    const paddingString = ' '.repeat(padding);
    return paddingString + numbersWithoutPaddings + paddingString;
  }

  function getValuesForPifagorianTringle(n) {
    if (n < 0) {
      return [];
    }
    const resultMaxtrix = [[1]];
    for (let i = 1; i < n; i++) {
      const prevValue = resultMaxtrix[i - 1];
      const newValue = [1];
      for (let j = 1; j < prevValue.length; j++) {
        newValue.push(prevValue[j] + prevValue[j - 1]);
      }
      newValue.push(1);
      resultMaxtrix.push(newValue);
    }
    return resultMaxtrix;
  }

  return function() {
    const n = parseInt(prompt('Введіть кількість рівнів трикутника', 0));
    if (!n || n < 0) {
      alert('Невірно введені дані');
      return;
    }
    let defaultSpacesNum = 3;
    const spacing = parseInt(prompt('При бажанні можете задати свою кількість пробілів між числами. Дефолтне значення ' + defaultSpacesNum)) || -1;
    if (spacing > 0) {
      defaultSpacesNum = spacing;
    }

    const triangleValues = getValuesForPifagorianTringle(n);
    const lastRow = triangleValues[triangleValues.length - 1];
    const lastRowStringLength = getStringForPifagorianRow(lastRow, defaultSpacesNum).length;

    triangleValues.forEach(row => {
      const stringFromRow = getStringForPifagorianRow(row, defaultSpacesNum, lastRowStringLength);
      output(stringFromRow);
    });
  }
})()

