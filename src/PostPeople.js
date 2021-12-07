import { LitElement, html } from 'lit-element';
import { PostDAta } from './components/postData';

export class JsonPLaceholder extends LitElement {

  static get properties() {
    return {
      id: {type: Number},
      nombre: {type: String},
      edad: {type: String},
      datos: {type: Object}
    }
  }

  constructor() {
    super();
    this.methodPost = new PostDAta();
    this.id = 0;
    this.nombre = '';
    this.edad = 0;
    this.datos = {};
  }

  render() {
    return html`
    <form @submit=${this.dataPost}>
      <label>
        <input
          id="nombre"
          type="text"
          .value="${this.nombre}"
          placeholder="dame un nombre"
        >
      </label>
      <label>
        <input
          id="edad"
          type="number"
          .value="${this.edad}"
          placeholder="dame la edad"
        >
      </label>
      <label>
        <input
          id="identificador"
          type="number"
          .value="${this.id}"
          placeholder="ingresa el id"
        >
      </label>
      <button type="submit">Agregar</button>
    </form>
    ${this.getAllDatos()}
    `;
  }

  dataPost(e) {
    e.preventDefault()
    this.id = e.target['identificador'].value;
    this.nombre = e.target['nombre'].value;
    this.edad = e.target['edad'].value;
    this.methodPost.postData(this.nombre, this.id, this.edad);
    this.methodPost.addEventListener('PostApí', (data) => {
      this.datos = data.detail.data;
    })
  }

  getAllDatos() {
    return html`
      <p>${this.datos.nombre}</p>
      <p>${this.datos.edad}</p>
      <p>${this.datos.id}</p>
    `;
  }


}
customElements.define('my-postapi', JsonPLaceholder);