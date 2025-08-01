import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const buttonElem = document.querySelector('button');
const inputElem = document.querySelector('#datetime-picker');

let timer = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let userSelectedDate;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);    
    if (selectedDates[0] <= options.defaultDate) {
      buttonElem.classList.remove('is-active');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: "topRight",
      });           
    } else {
      buttonElem.classList.add('is-active');      
    }
    userSelectedDate = selectedDates[0];    
  },
};

const fp = flatpickr("#datetime-picker", options);

function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day); 
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

buttonElem.addEventListener('click', handleButtonElem);
function handleButtonElem(){
    buttonElem.classList.remove('is-active');
    inputElem.setAttribute("disabled", "");
    setTimer();
    if (intervalId) {
        return;
    }
    intervalId = setInterval(()=>{        
        setTimer();
    }, 1000);
}

function setTimer() {
    const initTime = Date.now();
    const diff = userSelectedDate.getTime() - initTime;    
    const currentMoment = (convertMs(Math.max(0, diff)));
    for (const key in timer) {
        timer[key].textContent = currentMoment[key];
    }        
    if (diff < 1000) {    
        iziToast.success({
            title: 'OK',
            message: 'Time is up! Let see what is next!',
            position: "topRight",
        });
        clearInterval(intervalId);
        intervalId = null;
        inputElem.removeAttribute("disabled", "");
    }
}

