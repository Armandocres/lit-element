import { LitElement, html } from 'lit-element';
import { GetDAta } from './components/getData';

export class RIckMOrtyAPi extends LitElement {

  static get properties() {
    return {
      items: { type: Array}
    }
  }

  constructor() {
    super();
    this.items = []
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
    datos.method = 'POST';
    const valueInput = ShadowRoot.document.getElementById("character").value;
    console.log(valueInput);
    // datos.getOneDataApi()
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
}

customElements.define('my-rickandmorty', RIckMOrtyAPi);