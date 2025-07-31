import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const buttonElem = document.querySelector('button');

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
    if (selectedDates[0] < options.defaultDate) {
      buttonElem.classList.remove('is-active');
      window.alert('Please choose a date in the future');      
    } else {
      buttonElem.classList.add('is-active');      
    }
    userSelectedDate = selectedDates[0];
    
  },
};
const inputElem = document.querySelector('#datetime-picker');
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

    if (intervalId) {
        return;
    }    
    intervalId = setInterval(()=>{        
        const initTime = Date.now();
        const diff = userSelectedDate.getTime() - initTime;
        if (diff >= 0) {
            const currentMoment = (convertMs(diff));        
            for (const key in timer) {    
                timer[key].textContent = currentMoment[key];
            }
        } else {
            clearInterval(intervalId);
            inputElem.removeAttribute("disabled", "");
        }
    }, 1000);
}









