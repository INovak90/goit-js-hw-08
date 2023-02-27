import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}
function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}
const localStorageFormJSON = localStorage.getItem(STORAGE_KEY);
const savedFormData = JSON.parse(localStorageFormJSON);

if (localStorageFormJSON && savedFormData.email) {
  refs.inputEmail.value = savedFormData.email;
}
if (localStorageFormJSON && savedFormData.message) {
  refs.textarea.value = savedFormData.message;
}
formData = savedFormData;