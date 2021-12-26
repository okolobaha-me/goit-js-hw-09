function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timer = 0;

const changeColor = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};

const onClickStart = () => {
  timer = setInterval(changeColor, 1000);
  refs.startBtn.setAttribute('disabled', true);
};

const onClickStop = () => {
  clearInterval(timer);
  refs.startBtn.removeAttribute('disabled');
};

refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);
