import { LitElement } from 'lit-element';

//datamanagers

export class PostDAta extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      tSec: { type: String}
    }
  }

  constructor() {
    super();
    this.url = 'http://localhost:3000/personas'
    this.tSec = this._getTsec();
  }

  _sendData(data) {
    this.dispatchEvent(new CustomEvent('PostApí', {
      detail: { data },
      bubbles: true,
      composed: true
    }))
  }

  _getTsec() {
    try {
      const tSec = window.sessionStorage.getItem('tSec')
    } catch (error) {
      tSec = 'tsec'
    }
    return tSec
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
        'tSec': 'algo'
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