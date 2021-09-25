class Counter {
  constructor(initValue = 0) {
    this._value = initValue;
  }

  get value() {
    return this._value;
  }

  plus() {
    this._value++;
  }

  minus() {
    if (this._value <= 0) return;
    this._value--;
  }

  reset() {
    this._value = 0;
  }
}

export default Counter;
