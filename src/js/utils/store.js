class Store {
  static setLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  static getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  }
}

export default Store;
