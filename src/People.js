import { LitElement, html } from 'lit-element';
import { GetDAta } from './components/getData';

export class RIckMOrtyAPi extends LitElement {

  static get properties() {
    return {
      items: { type: Array },
      charac: { type: Object },
      valueInput: {type: Number}
    }
  }

  constructor() {
    super();
    this.datos = new GetDAta();
    this.items = [];
    this.charac = {};
    this.valueInput = 0;
    this.attachShadow({ mode: 'open' });
  }

  render() {
    return html`
      <button @click='${this.getData}'>Trae información completa</button>
      ${this.dataTemplate}
      ${this.dataOneTemplate}
    `;
  }

  getData() {
    this.datos.getDataApi();
    this.datos.addEventListener('ApiCall', (data) => {
      this._dataFormat(data.detail.data);
    })
  }

  _dataFormat(data) {
    let characters = [];

    data.forEach((character) => {
      characters.push({
        nombre: character.nombre,
        edad: character.edad,
        id: character.id
      })
    })
    this.items = characters;
  }

  onChange(e) {
    this.valueInput = parseInt(e.target.value);
  }

  get dataTemplate() {
    return html`
      ${this.items.map(character => html`
        <div>
          <ul>
            <li>Nombre: ${character.nombre}</li>
            <p>Edad: ${character.edad}</p>
            <p>Id: ${character.id}</p>
          </ul>
        </div>
      `)}
    `
  }

}

customElements.define('my-rickandmorty', RIckMOrtyAPi);