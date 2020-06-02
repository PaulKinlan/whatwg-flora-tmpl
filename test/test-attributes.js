import assert from 'assert';
import template from '../lib/index.js';
import readAll from './helpers.js';

describe('Attributes', function(){
  it('basics works', async function(){
    function tmpl({myClass, name}) {
      return template`<span class="${myClass}">Hello ${name}</span>`
    }

    let expected = [
      '<span class="',
      'blue',
      '">Hello ',
      'Wilbur',
      '</span>'
    ];

    let values = await readAll(await tmpl({
      myClass: Promise.resolve().then(_ => 'blue'),
      name: 'Wilbur'
    }));

    assert.deepEqual(values, expected);
  });
});
