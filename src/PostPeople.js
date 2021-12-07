import { LitElement, html, css } from 'lit-element';
import { PostDAta } from './components/postData';
import { styles } from './styles/postpeople';

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

  static get styles() {
    return [styles]
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
          placeholder="dame la edad"
        >
      </label>
      <label>
        <input
          id="identificador"
          type="number"
          placeholder="ingresa el id"
        >
      </label>
      <button type="submit" class='Botton--submit'>Agregar</button>
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
      ${this.datos.nombre ? html`
        <div class='Container--getData'>
          <ul>
            <li>Nombre: ${this.datos.nombre}</li>
            <p>Edad: ${this.datos.edad}</p>
            <p>Id: ${this.datos.id}</p>
          </ul>
        </div>
      ` : ''}
    `;
  }


}
customElements.define('my-postapi', JsonPLaceholder);