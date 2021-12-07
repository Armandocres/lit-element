import { fixture, html } from '@open-wc/testing';

describe('my-test', () => {
  it('works', async () => {
    const el = await fixture(html` <my-postapi></my-postapi> `);
    await expect(el).to.be.accessible();
  });
});