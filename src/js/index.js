import '@babel/polyfill';
import Counter from './counter.js';
import '../assets/favicon/favicon.ico';
import '../assets/favicon/favicon-16x16.png';
import '../assets/favicon/favicon-32x32.png';
import '../assets/favicon/apple-touch-icon.png';
import '../assets/favicon/android-chrome-192x192.png';
import '../assets/favicon/android-chrome-512x512.png';

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
};

function App() {
  this.state = {
    id: 0,
    counterArray: [],
  };

  this.init = () => {
    const storedData = store.getLocalStorage();
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

  const $CounterList = $('.counter-list');
  const $btnAddCounter = $('#btnAddCounter');

  const addCounter = (id, initValue = 0) => {
    this.state.counterArray.push({
      id,
      counter: new Counter(initValue),
    });
    $CounterList.insertAdjacentHTML(
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

  if ($CounterList) {
    $CounterList.addEventListener(
      'click',
      (e) => {
        if (e.target.nodeName !== 'BUTTON') {
          return;
        }

        const classList = e.target.classList;
        const $wrapper = e.target.closest('.counter-wrapper');
        const $counterValue = $wrapper.querySelector('.counter-value');
        const id = Number($wrapper.dataset.id);

        const index = this.state.counterArray.findIndex((c) => c.id === id);
        let counter = this.state.counterArray[index].counter;

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
        if (
          classList.contains('remove') &&
          this.state.counterArray.length > 1
        ) {
          counter = null;
          this.state.counterArray.splice(index, 1);
          $wrapper.remove();
        }
        store.setLocalStorage(this.state);
      },
      true
    );
  }

  if ($btnAddCounter) {
    $btnAddCounter.addEventListener('click', () => {
      addCounter(this.state.id);
      this.state.id++;
      store.setLocalStorage(this.state);
    });
  }
}

const app = new App();
app.init();
