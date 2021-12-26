import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    checkData(selectedDates[0]);
  },
};

flatpickr(refs.dataInput, options);

const toggleBtn = flag => {
  if (flag) {
    refs.startBtn.setAttribute('disabled', flag);
    return;
  }
  refs.startBtn.removeAttribute('disabled');
};

toggleBtn(true);

let selectedTime = 0;
let interval = 0;

const checkData = selected => {
  if (selected > new Date()) {
    toggleBtn(false);
    selectedTime = selected;
    return;
  }
  Notify.failure('Please choose a date in the future');
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const timerStart = () => {
  const time = new Date();
  if (time >= selectedTime) {
    clearInterval(interval);
    return;
  }
  const diff = convertMs(selectedTime - time);
  refs.days.textContent = diff.days;
  refs.hours.textContent = diff.hours;
  refs.minutes.textContent = diff.minutes;
  refs.seconds.textContent = diff.seconds;
};

const omClickStart = () => {
  toggleBtn(true);
  timerStart();
  interval = setInterval(timerStart, 1000);
  Notify.success('Timer started');
};

refs.startBtn.addEventListener('click', omClickStart);
