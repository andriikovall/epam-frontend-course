import { getUsersImages } from './api';
import { createImageElementWithoutSrc, styleImageToShow, styleImageToHide } from './imageHelper';


const container = document.getElementById('root');

(async function main() {

    const count = parseInt(prompt('Enter images count', '50'));
    try {
        const images = await getUsersImages(count);
        images.forEach(img => {
            const imgElem = createImageElementWithoutSrc(img.medium);  
            container.appendChild(styleImageToHide(imgElem)); 
        });   
    } catch(err) {
        alert('invalid count value or ither error ' + err);
    }
 
    const targets = document.getElementsByClassName('user-image'); 
    
    const lazyLoad = (target) => {
        const intersectionObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imageEl = entry.target;
                    imageEl.setAttribute('src', imageEl.dataset.src);
                    styleImageToShow(imageEl);
                }
            })
 
        });
     
        intersectionObserver.observe(target);
    } 
    
    for (const target of targets) {
        lazyLoad(target);
    }
})()




