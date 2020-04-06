export const createImageElementWithoutSrc = (src) => {
    const elem = document.createElement('img');
    // elem.src = src
    elem.dataset.src = src;
    return elem; 
}

export const styleImageToHide = (imgEL) => {
    imgEL.classList.add('user-image', 'faded');  
    return imgEL; 
}   

export const styleImageToShow = (imgEl) => {
    imgEl.classList.remove('faded');
    return imgEl;
};