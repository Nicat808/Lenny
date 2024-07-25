export const baseUrl = import.meta.env.VITE_APP_STRAPI_BASE_URL
export const storeUser = (data) =>{
    localStorage.setItem(
        "user",
        JSON.stringify(data)
    )
}
export const userData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""'
    return JSON.parse(stringifiedUser || {})
}
export function setLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error setting data in localStorage:', error);
  }
}
export function getLocalStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
}  
export function debounce(func, delay) {
  let timerId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}