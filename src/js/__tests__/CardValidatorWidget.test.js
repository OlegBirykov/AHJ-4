import CardValidatorWidget from '../CardValidatorWidget';

document.body.innerHTML = '<div id="container"></div>';
const container = document.querySelector('#container');
const widget = new CardValidatorWidget(container);
widget.bindToDOM();

const input = container.querySelector(CardValidatorWidget.inputSelector);
const button = container.querySelector(CardValidatorWidget.buttonSelector);
const result = container.querySelector(CardValidatorWidget.resultSelector);

test('should add .valid class for valid number', () => {
  input.value = '3540123456789016';
  button.click();
  expect(result.classList.contains('valid')).toBeTruthy();
});

test('should not add .valid class for valid number', () => {
  input.value = '3540123456789015';
  button.click();
  expect(result.classList.contains('valid')).toBeFalsy();
});
