import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formInputElem = document.querySelector('.form-input');
const formElem = document.querySelector('.form');

formElem.addEventListener('submit', handleButtonElem);
function handleButtonElem(event) {
    event.preventDefault();
    document.activeElement.blur();
    const delay = Number(formInputElem.value);
    const isFulfilled = document.querySelector('input[name="state"]:checked').value === 'fulfilled';   
    const promise = createPromise(delay, isFulfilled);    
    promise.then(()=>{
        iziToast.success({            
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
        });
    }).catch(()=>{
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight",
        })
    })    
}
function createPromise(delay, isFulfilled) {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
        if (isFulfilled) {
            res();
        } else {
            rej();
        }
        }, delay);
    });
    return promise;
}

