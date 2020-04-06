import { getUsersImages } from './api';
import { createImageElementWithoutSrc, styleImageToHide, styleImageToShow } from './imageHelper';  
import { lazyLoad } from './lazyLoader';


const container = document.getElementById('root');

(async function main() {

    await appendImages(25);
    window.onscroll = e => { 
         
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
            appendImages(5);
            console.log('appending'); 
        } 
    };
    
})()


async function appendImages(count) {
    try {
        const images = await getUsersImages(count);
        images.forEach(img => {
            const imgElem = createImageElementWithoutSrc(img.medium);  
            container.appendChild(styleImageToHide(imgElem)); 
            lazyLoad(imgElem, () => {
                styleImageToShow(imgElem);
                imgElem.setAttribute('src', imgElem.dataset.src);
            });
        });   
    } catch(err) {
        alert('invalid count value or ither error ' + err);
    }
}




