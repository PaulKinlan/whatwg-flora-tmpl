import assert from 'assert';
import template from '../lib/index.js';
import readAll from './helpers.js';

describe('TextNodes', function(){
  it('basics works', async function(){
    async function tmpl({name}) {
      return await template`<span class="msg">Hello <strong>${name}</strong>!</span>`;
    }

    let expected = ['<span class="msg">Hello <strong>', 'World', '</strong>!</span>'];

    let values = await readAll(await tmpl({
      name: Promise.resolve('World')
    }));

    assert.deepEqual(values, expected);
  });

  it('Null/undefined values are blanks', async function(){
    async function tmpl(data) {
      return await template`<span>${data.one}</span><span>${data.two}</span>`;
    }

    let expected = ['<span>','</span><span>','</span>'];

    let values = await readAll(await tmpl({
      one: void 0,
      two: null
    }));

    assert.deepEqual(values, expected);
  });

  it('A promise can resolve to a stream', async function(){
    async function tmpl({name}) {
      async function strongName() {
        return await template`<strong>${name}</strong>`;
      }

      return await template`<span class="msg">Hello ${strongName()}!</span>`;
    }

    let expected = ['<span class="msg">Hello ', '<strong>', 'World',
      '</strong>', '!</span>'];

    let values = await readAll(await tmpl({
      name: Promise.resolve('World')
    }));

    assert.deepEqual(values, expected);
  });
});
