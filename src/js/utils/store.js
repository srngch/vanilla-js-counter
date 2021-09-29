const store = {
  setLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
};

export default store;
