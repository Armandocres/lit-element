import { html, fixture, expect } from '@open-wc/testing';

import '../src/my-counter';

describe('Haciendo pruebas', () => {
  it('has a default counter 0', async () => {
    const el = await fixture(html`
      <my-counter></my-counter>
    `);

    expect(el.counter).to.equal(0);
  });

  it('incrementar el contador con el botón', async () => {
    const el = await fixture(html`
      <my-counter></my-counter>
    `);
    el.incrementar();
    // el.shadowRoot.querySelector('#sumar').click();

    expect(el.counter).to.equal(1);
  });

  it('de-crementar el contador con el botón', async () => {
    const el = await fixture(html`
      <my-counter></my-counter>
    `);
    el.shadowRoot.querySelector('#restar').click();

    expect(el.counter).to.equal(-1);
  });

  it('reiniciar el contador con el botón', async () => {
    const el = await fixture(html`
      <my-counter></my-counter>
    `);
    el.shadowRoot.querySelector('#reiniciar').click();

    expect(el.counter).to.equal(0);
  });

})