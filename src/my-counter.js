import { LitElement, html } from 'lit-element';

export class MyCounter extends LitElement {


  static get properties() {
    return {
      counter: {type: Number}
    }
  }

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    return html`
    <style>
      div {
        border: 1px solid #ddd;
      }

      .x {
        background: #ccc;
        color: #fff;
      }
    </style>
      <div class="x">Llevas: ${this.counter}</div>
      <div>
        <button @click="${this.incrementar}">+1</button>
        <button @click="${this.reiniciar}">Reiniciar</button>
        <button @click="${this.decrementar}">-1</button>
      </div>
    `;
  }

  incrementar() {
    this.counter++;
  }

  decrementar() {
    this.counter--;
  }

  reiniciar() {
    this.counter = 0;
  }
}
customElements.define('my-counter', MyCounter);