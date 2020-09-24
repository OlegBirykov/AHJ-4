import { isValid, getPaySystemInfo } from './tools';

export default class CardValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.activeCard = null;
  }

  static get markup() {
    return `
    <div class="card-validator">
      <ul class="cards">
        <li>
          <span class="card visa" title="Visa">Visa</span>
        </li>
        <li>
          <span class="card master" title="Mastercard">Mastercard</span>
        </li>
        <li>
          <span class="card maestro" title="Maestro">Maestro</span>
        </li>
        <li>
          <span class="card amex" title="American Express">American Express</span>
        </li>
        <li>
          <span class="card discover" title="Discover">Discover</span>
        </li>
        <li>
          <span class="card diners" title="Diners Club">Diners Club</span>
        </li>
        <li>
          <span class="card jcb" title="JCB International">JCB International</span>
        </li>
        <li>
          <span class="card unionpay" title="China UnionPay">China UnionPay</span>
        </li>
        <li>
          <span class="card mir" title="Мир">Мир</span>
        </li>
      </ul>
      <form class="validator-form" data-id="form">
        <input class="form-control" name="card_number" type="text" placeholder="Card number" required>
        <a class="form-button" href="." data-id="button">Click to Validate</a>
      </form>
      <p class="result"></p>
    </div>
    `;
  }

  static get buttonSelector() {
    return '[data-id=button]';
  }

  static get formSelector() {
    return '[data-id=form]';
  }

  static get inputSelector() {
    return '.form-control';
  }

  static get cardSelector() {
    return '.card';
  }

  static get resultSelector() {
    return '.result';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;

    this.button = this.parentEl.querySelector(this.constructor.buttonSelector);
    this.form = this.parentEl.querySelector(this.constructor.formSelector);
    this.input = this.parentEl.querySelector(this.constructor.inputSelector);
    this.cards = this.parentEl.querySelectorAll(this.constructor.cardSelector);
    this.result = this.parentEl.querySelector(this.constructor.resultSelector);

    this.button.addEventListener('click', (event) => this.onSubmit(event));
    this.form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.activeCard) {
      this.activeCard.classList.remove('card-highlight');
      this.activeCard = null;
    }

    const number = this.input.value.trim();
    const result = isValid(number);
    this.result.innerText = result.text;

    if (!result.status) {
      this.result.classList.add('invalid');
      this.result.classList.remove('valid');
      return;
    }

    this.result.classList.add('valid');
    this.result.classList.remove('invalid');

    const paySystem = getPaySystemInfo(number);
    if (paySystem < 0) {
      this.result.innerText += ' (unknown payment system)';
    } else {
      this.activeCard = this.cards[paySystem];
      this.activeCard.classList.add('card-highlight');
    }
  }
}
