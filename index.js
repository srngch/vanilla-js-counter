import Counter from './counter.js';

const $ = (selector) => document.querySelector(selector);

function App() {
  const counter = new Counter();
  const domCounterValue = $('#counterValue');
  const domCounterPlus = $('#counterPlus');
  const domCounterMinus = $('#counterMinus');
  const domCounterReset = $('#counterReset');

  function updateValue() {
    const counterValue = counter.value;
    domCounterValue.textContent = counterValue;
  }

  domCounterPlus.addEventListener('click', (e) => {
    counter.plus();
    updateValue();
  });
  domCounterMinus.addEventListener('click', (e) => {
    counter.minus();
    updateValue();
  });
  domCounterReset.addEventListener('click', (e) => {
    counter.reset();
    updateValue();
  });
}

App();
