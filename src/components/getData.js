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
    try {
      this.dispatchEvent(new CustomEvent('ApiCall', {
        detail: { data },
        bubbles: true,
        composed: true
      }))
    } catch (error) {
      this.dispatchEvent(new CustomEvent('ERROR-CATCH', {
        detail: {error}
      }))
    }
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