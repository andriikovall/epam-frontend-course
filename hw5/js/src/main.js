import { getUsersImages } from './api';
import { createImageElementWithoutSrc, styleImageToHide, styleImageToShow } from './imageHelper';
import { lazyLoad } from './lazyLoader';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators'



const container = document.getElementById('root');
 
(async function main() {    
    await appendImages(25);

    const debouncedScrollEvent = fromEvent(window, 'scroll').pipe(debounceTime(100));
    debouncedScrollEvent.subscribe(e => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 450) {
            appendImages(25);
        }
    }) 

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
    } catch (err) {
        alert('invalid count value or ither error ' + err);
    }
}



 
