import '@babel/polyfill';
import Counter from './counter.js';
import $ from './utils/querySelector.js';
import Store from './utils/store.js';

import '../assets/favicon/favicon.ico';
import '../assets/favicon/favicon-16x16.png';
import '../assets/favicon/favicon-32x32.png';
import '../assets/favicon/apple-touch-icon.png';
import '../assets/favicon/android-chrome-192x192.png';
import '../assets/favicon/android-chrome-512x512.png';
import '../assets/preview.png';

function App() {
  this.state = {
    id: 0,
    counterArray: [],
  };

  this.init = () => {
    const storedData = Store.getLocalStorage();
    if (storedData) {
      this.state.id = storedData.id;
      storedData.counterArray.forEach((c) => {
        addCounter(c.id, c.counter._value);
        this.state.id = c.id + 1;
      });
      return;
    }
    addCounter(this.state.id);
    this.state.id++;
  };

  const $counterList = $('.counter-list');
  const $btnAddCounter = $('#btnAddCounter');

  const addCounter = (id, initValue = 0) => {
    this.state.counterArray.push({
      id,
      counter: new Counter(initValue),
    });
    $counterList.insertAdjacentHTML(
      'beforeend',
      counterTemplate(id, initValue)
    );
  };

  const counterTemplate = (id, value = 0) => `
		<section class="counter-wrapper" data-id="${id}">
			<div class="counter-value">${value}</div>
			<div class="counter-control">
				<button class="counter-button plus"><i class="icon-plus"></i></button>
				<button class="counter-button minus"><i class="icon-minus"></i></button>
				<button class="counter-button reset"><i class="icon-circle"></i></button>
				<button class="counter-button remove"><i class="icon-cancel"></i></button>
			</div>
		</section>
	`;

  $counterList.addEventListener(
    'click',
    (e) => {
      if (e.target.nodeName !== 'BUTTON') {
        return;
      }

      const classList = e.target.classList;
      const $wrapper = e.target.closest('.counter-wrapper');
      const $counterValue = $wrapper.querySelector('.counter-value');
      const isSelectedCounterId = (c) => c.id === Number($wrapper.dataset.id);

      let counter = this.state.counterArray.find(isSelectedCounterId).counter;

      if (classList.contains('plus')) {
        counter.plus();
        $counterValue.textContent = counter.value;
      }
      if (classList.contains('minus')) {
        counter.minus();
        $counterValue.textContent = counter.value;
      }
      if (classList.contains('reset')) {
        counter.reset();
        $counterValue.textContent = counter.value;
      }
      if (classList.contains('remove') && this.state.counterArray.length > 1) {
        this.state.counterArray.filter(isSelectedCounterId);
        counter = null;
        $wrapper.remove();
      }
      Store.setLocalStorage(this.state);
    },
    true
  );

  $btnAddCounter.addEventListener('click', () => {
    addCounter(this.state.id);
    this.state.id++;
    Store.setLocalStorage(this.state);
    $btnAddCounter.scrollIntoView();
  });
}

const app = new App();
app.init();
