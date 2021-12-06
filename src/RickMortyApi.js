import { LitElement, html } from 'lit-element';
import { GetDAta } from './components/getData';

export class RIckMOrtyAPi extends LitElement {

  static get properties() {
    return {
      items: { type: Array },
      charac: { type: Object}
    }
  }

  constructor() {
    super();
    this.items = [];
    this.charac = {}
    this.attachShadow({ mode: 'open' })
  }


  render() {
    return html`
      <button @click='${this.getData}'>Trae información completa</button>
      <form>
        <label>
          <input
            id="character",
            type="number",
            placeholder="ingresa un id del personaje (numero)"
          >
          <button type="button" @click='${this.getOneData}'>Buscalo</button>
        </label>
      </form>
      <!-- ${this.dataTemplate} -->
      ${this.dataOneTemplate}
    `;
  }

  getData() {
    let datos = new GetDAta();
    datos.url = 'https://rickandmortyapi.com/api/character';
    datos.method = 'GET';
    datos.getDataApi();
    datos.addEventListener('ApiCall', (data) => {
      this._dataFormat(data.detail.data);
    })
  }

  getOneData() {
    let datos = new GetDAta();
    datos.method = 'GET';
    let valueInput = this.renderRoot.querySelector('#character').value;
    datos.getOneDataApi(valueInput);
    datos.addEventListener('ApiCall', (data) => {
      this._dataOneFormat(data.detail.data);
    })
  }

  _dataFormat(data) {
    let characters = [];

    data["results"].forEach((character) => {
      characters.push({
        img: character.image,
        name: character.name,
        species: character.species,
        status: character.status
      })
    })
    this.items = characters;
  }

  _dataOneFormat(data) {
    let character = data;
    this.charac = character;
    console.log(this.charac.image);
  }

  get dataTemplate() {
    return html`
      ${this.items.map(character => html`
        <div>
          <p>${character.name}</p>
          <p>${character.species}</p>
          <p>${character.status}</p>
          <img src='${character.img}' alt='character img' />
        </div>
      `)}
    `
  }

  get dataOneTemplate() {
    return html`
      <p>${this.charac.name}</p>
      <p>${this.charac.species}</p>
      <p>${this.charac.status}</p>
      ${this.charac.image ? html`<img src='${this.charac.image}' />` : '' }
    `;
  }

}

customElements.define('my-rickandmorty', RIckMOrtyAPi);