class Counter {
  constructor() {
    this._value = 0;
  }

  get value() {
    return this._value;
  }

  plus() {
    this._value++;
  }

  minus() {
    this._value--;
  }

  reset() {
    this._value = 0;
  }
}

export default Counter;
