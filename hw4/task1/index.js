(function () {
  const form = document.forms['image-form'];
  const formInputs = form.querySelectorAll('input');
  const imageEl = document.querySelector('.main__image img');

  function isColor(colorStr) {
    const s = new Option().style;
    s.color = colorStr;
    console.log(colorStr, s.color == colorStr); 
    return s.color == colorStr;
  }

  function getInvalidElements() {
    const keys = [
      { name: 'height', type: 'number', required: true },
      { name: 'width', type: 'number', required: true },
      { name: 'border-thickness', type: 'number', required: true },
      { name: 'border-color', type: 'css-color', required: true },
      { name: 'alt', type: 'text', required: false }
    ];

    return keys.filter(key => {
        let isValid = true;

        if (!key.required) 
          return !isValid;

        switch (key.type) {
          case 'number': {
            const value = parseInt(form[key.name].value);
            isValid = value && value > 0;
            break;
          }
          case 'text': {
            isValid = !!form[key.name].value;
            break;
          }
          case 'css-color': {
            isValid = isColor(form[key.name].value);
            break;
          }
        }
        return !isValid;
      })
      .map( ({ name }) => form[name]); 
  }

  function applyImageChanges({ height, width, borderThickness, borderColor, alt}) {
    console.log(imageEl.style);
    imageEl.style.height = height + 'px';
    imageEl.style.width = width + 'px';
    imageEl.style.border = `${borderThickness}px solid ${borderColor}`;
    imageEl.setAttribute('alt', alt);
    console.log(imageEl.style);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalidElems = getInvalidElements();

    for (const formInputEl of formInputs) {
      formInputEl.classList.remove('invalid');
    }
    invalidElems.forEach(el => el.classList.add('invalid'));

    if (invalidElems.length === 0) {
      const imageOpts = {
        height: form.height.value, 
        width: form.width.value, 
        borderThickness: form['border-thickness'].value, 
        borderColor: form['border-color'].value, 
        alt: form.alt.value
      };
      applyImageChanges(imageOpts);
    }
  });

})();