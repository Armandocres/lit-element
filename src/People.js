import { LitElement, html, css } from 'lit-element';
import { GetDAta } from './components/getData';
import { styles } from './styles/people';

export class RIckMOrtyAPi extends LitElement {

  static get properties() {
    return {
      items: { type: Array },
      charac: { type: Object },
      valueInput: {type: Number}
    }
  }

  static get styles() {
    return [
      styles
    ]
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
      <button @click='${this.getData}' class='Button-getData'>Trae información completa</button>
      ${this.dataTemplate()}
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

  dataTemplate() {
    return html`
      ${this.items.map(character => html`
        <div class='Container'>
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