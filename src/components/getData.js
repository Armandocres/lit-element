import { LitElement } from 'lit-element';

export class GetDAta extends LitElement {

  static get properties() {
    return {
      url: { type: String },
    }
  }

  constructor() {
    super()
    this.url = 'http://localhost:3000/personas'
  }

  _sendData(data) {
    this.dispatchEvent(new CustomEvent('ApiCall', {
      detail: { data },
      bubbles: true,
      composed: true
    }))
  }

  getDataApi() {
    fetch(this.url, { method: 'GET' })
      .then((response) => {
        if (response.status === 200) {
          this.dispatchEvent(new CustomEvent('SUCCES', {
            detail: {response}
          }))
          return response.json()
        }
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
customElements.define('my-getdata', GetDAta);