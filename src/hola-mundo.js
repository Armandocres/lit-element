import { LitElement, html } from "lit-element";

class HolaMundo extends LitElement {

  static get properties() {
    return {
      quien: { type: String}
    }
  }

  constructor() {
    super();
    this.quien = 'Armando'
    this.attachShadow({mode: 'open'});
  }


  render() {
    return html`
      <p>Hola <b>${this.quien}</b></p>
    `;
  }
}

customElements.define('hola-mundo', HolaMundo);