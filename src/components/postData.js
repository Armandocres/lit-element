import { LitElement } from 'lit-element';

export class PostDAta extends LitElement {
  static get properties() {
    return {
      url: { type: String },
    }
  }

  constructor() {
    super();
    this.url = 'https://jsonplaceholder.typicode.com/'
  }

  _sendData(data) {
    this.dispatchEvent(new CustomEvent('PostApí', {
      detail: { data },
      bubbles: true,
      composed: true
    }))
  }


  postData(title, body, userId, path) {
    fetch(`${this.url + path}`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        userId
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