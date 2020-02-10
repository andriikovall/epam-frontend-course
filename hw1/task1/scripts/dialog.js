const showButton = document.getElementById('showEmbed');
const cancelButton = document.getElementById('cancel');
const embedDialog = document.getElementById('embedDialog');

showButton.addEventListener('click', function () {
    embedDialog.showModal();
});

cancelButton.addEventListener('click', function () {
    embedDialog.close();
});
