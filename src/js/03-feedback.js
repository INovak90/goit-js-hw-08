import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('input', throttle(onFormInput, 500));

form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}
function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
}
const localStorageFormJSON = localStorage.getItem(STORAGE_KEY);
const savedFormData = JSON.parse(localStorageFormJSON);

if (localStorageFormJSON) {
  inputEmail.value = savedFormData.email;
  textarea.value = savedFormData.message;
}
