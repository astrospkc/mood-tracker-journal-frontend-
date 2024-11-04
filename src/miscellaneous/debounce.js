function debounce(cb, delay) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("debounce");
      cb(...args);
    }, delay);
  };
}
export default debounce;
