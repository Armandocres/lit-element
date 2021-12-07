import { LitElement } from 'lit-element';

//datamanagers

export class PostDAta extends LitElement {
  static get properties() {
    return {
      url: { type: String },
    }
  }

  constructor() {
    super();
    this.url = 'http://localhost:3000/personas'
  }

  _sendData(data) {
    this.dispatchEvent(new CustomEvent('PostApí', {
      detail: { data },
      bubbles: true,
      composed: true
    }))
  }

  postData(nombre, id, edad) {
    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        id,
        edad
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this._sendData(data)
    })
    .catch((error) => {
      this.dispatchEvent(new CustomEvent('ERROR', {
      detail: {error}
    }))
  })
  }
}

customElements.define('my-postdata', PostDAta)