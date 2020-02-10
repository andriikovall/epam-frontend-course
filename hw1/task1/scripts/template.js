function appendTemplateTo(elem) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    elem.appendChild(clon);
}