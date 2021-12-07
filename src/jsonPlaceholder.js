import { LitElement, html } from 'lit-element';
import { PostDAta } from './components/postData';

export class JsonPLaceholder extends LitElement {

  static get properties() {
    return {
      valueInput: {type: Number},
      title: {type: String},
      body: {type: String},
      datos: {type: Object}
    }
  }

  constructor() {
    super();
    this.methodPost = new PostDAta();
    this.valueInput = 0;
    this.title = '';
    this.body = '';
    this.datos = {};
  }

  render() {
    return html`
    <form @submit=${this.dataPost}>
      <label>
        <input
          id="title"
          type="text"
          .value="${this.title}"
          placeholder="write a title"
          @input='${this.onChangeTitle}'
        >
      </label>
      <label>
        <input
          id="body"
          type="text"
          .value="${this.body}"
          placeholder="write a description"
          @input='${this.onChangeBody}'
        >
      </label>
      <label>
        <input
          id="identificador"
          type="number"
          .value="${this.valueInput}"
          placeholder="ingresa un id del personaje (numero)"
          @input='${this.onChangeInput}'
        >
      </label>
      <button type="submit">Buscalo</button>
    </form>
    ${this.getAllDatos()}
    `;
  }

  dataPost(e) {
    e.preventDefault()
    this.valueInput = e.target['identificador'].value;
    this.title = e.target['title'].value;
    this.body = e.target['body'].value;
    this.methodPost.postData(this.title, this.body, this.valueInput, 'posts');
    this.methodPost.addEventListener('PostApí', (data) => {
      this.datos = data.detail.data;
    })
  }

  getAllDatos() {
    return html`
      <p>${this.datos.title}</p>
      <p>${this.datos.body}</p>
      <p>${this.datos.userId}</p>
    `;
  }


}
customElements.define('my-postapi', JsonPLaceholder);