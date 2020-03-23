(function(){
  const form = document.forms['image-form'];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
  });

})();