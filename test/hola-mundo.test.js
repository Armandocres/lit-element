import { html, fixture, expect } from '@open-wc/testing';

import '../src/hola-mundo';


describe('Pruebas en Hola mundo', () => {
  it('debe de mostrarse el quien', async () => {
    const el = await fixture(html`
      <hola-mundo></hola-mundo>
    `);

    expect(el.quien).to.equal('Armando');
  })

  it('Poder sobre-escribir el atributo quien', async () => {
    const el = await fixture(html`
    <hola-mundo quien='Juan'></hola-mundo>
    `);

    expect(el.quien).to.equal('Juan');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <my-counter></my-counter>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
})