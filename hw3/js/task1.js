const task1 = (function () {
  const maxChildren = 10;
  const profecions = [
    'Сантехнік', 'Програміст',
    'Вчитель', 'Пілот', 'Підприємець',
    'Співак', 'Хімік', 'Фізик',
    'Актор', 'Дизайнер', 'Психолог'
  ];

  const maleNames = [
    'МАТВІЙ',
    'МАКСИМ',
    'АРТЕМ',
    'ДАНИЛО',
    'ВЛАДИСЛАВ',
    'ОЛЕКСАНДР',
    'ДАВИД',
    'МАРКО',
    'ДМИТРО',
    'ДЕНИС',
    'ДЕМ\'ЯН',
    'ТИМОФІЙ',
    'ЮРІЙ',
    'РОМАН',
    'БОГДАН',
    'ВОЛОДИМИР'
  ].map(capitalizeFirstLetter);

  const femaleNames = [
    'СОФІЯ',
    'АННА',
    'АНАСТАСІЯ',
    'ВІКТОРІЯ',
    'ВЕРОНІКА',
    'МАРІЯ',
    'СОЛОМІЯ',
    'ЯНА',
    'ЗЛАТА',
    'МАРТА',
    'ДІАНА',
    'ДАРИНА',
    'ЮЛІЯ',
    'ХРИСТИНА',
    'АНГЕЛІНА'
  ].map(capitalizeFirstLetter);

  const countries = [
    'Україна',
    'Данія',
    'Сингапур',
    'Словенія',
    'Швеція',
    'Ісладнія',
    'Бельгія',
    'Канада',
    'США',
    'Росія',
    'Туреччина',
    'Китай',
    'Чехія',
    'Англія',
    'Сам Марино',
    'Балі',
    'Північна Корея))',
    'СРСР'
  ];

  const male = 'Ч';
  const female = 'Ж';

  function getPossiblePartnerName(sex) {
    const allPossiblePartnerNames = sex === male ? [...femaleNames] : [...maleNames];
    const quantityKoef = 0.5;
    const severalPossiblePartnerNames = new Array(Math.round(allPossiblePartnerNames.length * quantityKoef)).fill('').map(_ => allPossiblePartnerNames[randInt(0, allPossiblePartnerNames.length - 1)]);
    return promptList([...new Set(severalPossiblePartnerNames)], 'Ваш майбутній партнер',
      'Нажаль, ми не змогли підібрати ідеального імені. Але не засмучуйтеся, бо кажуть, що все, що ми задумали, неодмінно збудеться! Уведіть бажане ім\'я');
  }

  function getPossibleJob() {
    const quantityKoef = 0.5;
    const severalPossibleJobs = new Array(Math.round(profecions.length * quantityKoef)).fill('').map(_ => profecions[randInt(0, profecions.length - 1)]);
    return promptList([...new Set(severalPossibleJobs)], 'Ваша майбутня робота',
      'Нажаль, ми не змогли підібрати ідеальну роботу для вас. Але не засмучуйтеся, бо кажуть, що все, що ми задумали, неодмінно збудеться! Уведіть бажану роботу');
  }


  function getPossibleCountry() {
    const quantityKoef = 0.5;
    const severalPossibleCountries = new Array(Math.round(countries.length * quantityKoef)).fill('').map(_ => countries[randInt(0, countries.length - 1)]);
    return promptList([...new Set(severalPossibleCountries)], 'Ваша майбутня країна проживання',
      'Нажаль, ми не змогли підібрати країну для вас. Але не засмучуйтеся, бо кажуть, що все, що ми задумали, неодмінно збудеться! Уведіть бажану країну');
  }

  function getPossibleChildrenCount() {
    const possibleChildrenCountList = [...new Set(new Array(maxChildren * 0.8).fill(0).map(_ => randInt(0, maxChildren)))];
    return promptList(possibleChildrenCountList, 'Кількість майбутніх дітей', 'Нажаль, ми не передбачаємо у вас іншу кількість дітей. Але не засмучуйтеся, бо кажуть, що все, що ми задумали, неодмінно збудеться! Уведіть бажану кількість дітей');
  }

  function createOutputMessage(partner, childrenCount, job, country) {
    const msg = `Ви укладете шлюб з ${partner} та у Вас буде ${childrenCount} дітей. ` +
      `Ви переїдете у ${country} на посаду ${job}`;
    return msg;
  }

  function promptList(possibleAnswers, selectMsg, failureMsg) {
    do {
      const randomIndex = randInt(0, possibleAnswers.length - 1);
      const randomValue = possibleAnswers[randomIndex];
      possibleAnswers.splice(randomIndex, 1);
      const msg = `${selectMsg} ${randomValue}?`;
      const response = confirm(msg);
      if (response) {
        return randomValue;
      }
    } while (possibleAnswers.length);
    const preferableValue = prompt(failureMsg, '') || '';
    if (preferableValue === '') {
      return null;
    } else {
      return preferableValue;
    }
  }

  return function () {
    const sex = (prompt('Введіть вашу стать (ч/ж)', '') || '').toUpperCase();
    if (![male, female].includes(sex.toUpperCase())) {
      alert('Невірний ввід');
      return;
    }
    const errorMsg = 'Схоже на те, що Вам зовсім не хочется змін у житті. Бувайте(';

    const possiblePartnerName = getPossiblePartnerName(sex);
    if (possiblePartnerName == null) {
      alert(errorMsg);
      return;
    }
    const possibleChildrenCount = parseInt(getPossibleChildrenCount());
    if (isNaN(possibleChildrenCount)) {
      alert(errorMsg);
    }

    const possibleJob = getPossibleJob();
    if (possibleJob == null) {
      alert(errorMsg);
    }

    const possibleCountry = getPossibleCountry();
    if (possibleCountry == null) {
      alert(errorMsg);
    }

    const output = createOutputMessage(possiblePartnerName, possibleChildrenCount, possibleJob, possibleCountry);
    alert(output);
  }

})()
