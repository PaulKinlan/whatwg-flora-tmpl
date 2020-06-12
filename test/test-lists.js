import assert from 'assert';
import template from '../lib/index.js';
import readAll from './helpers.js';

describe('Lists', function () {
  describe('Streams', function () {
    it('renders a template stream', async function () {
      async function tmpl() {
        return await template`<ul>${template`<li>Item ${1}</li>`}</ul>`;
      }

      let values = await readAll(await tmpl());

      let expected = [
        '<ul>',
        '<li>Item ',
        1,
        '</li>',
        '</ul>'
      ];

      assert.deepEqual(values, expected);
    })
  });

  describe('Arrays', function () {

    it('Renders an array of numbers', async function () {
      function tmpl({ items }) {
        return template`<ul>${items}</ul>`;
      }

      let values = await readAll(await tmpl({
        items: [
          1, 2, 3, 4
        ]
      }));

      let expected = [
        '<ul>',
        1, 2, 3, 4,
        '</ul>'
      ];

      assert.deepEqual(values, expected);
    });

    it('Renders an array of numbers from a map', async function () {
      function tmpl({ items }) {
        return template`<ul>${items.map(i => i * 2)}</ul>`;
      }

      let values = await readAll(await tmpl({
        items: [
          1, 2, 3, 4
        ]
      }));

      let expected = [
        '<ul>',
        "2", "4", "6", "8",
        '</ul>'
      ];

      assert.deepEqual(values, expected);
    });

    it('Renders an array of templates from a map', async function () {
      function tmpl({ items }) {
        return template`<ul>${items.map(i => template`${i * 2}`)}</ul>`;
      }

      let values = await readAll(await tmpl({
        items: [
          1, 2, 3, 4
        ]
      }));

      let expected = [
        '<ul>',
        "2", "4", "6", "8",
        '</ul>'
      ];

      assert.deepEqual(values, expected);
    });

    it('Renders an array of templates', async function () {
      function tmpl({ items }) {
        return template`<ul>${items}</ul>`;
      }

      let values = await readAll(await tmpl({
        items: [
          await template`<li>Item 1</li>`,
          await template`<li>Item 2</li>`,
          await template`<li>Item 3</li>`,
          await template`<li>Item 4</li>`
        ]
      }));

      let expected = [
        '<ul>',
        '<li>Item 1</li>',
        '<li>Item 2</li>',
        '<li>Item 3</li>',
        '<li>Item 4</li>',
        '</ul>'
      ];

      assert.deepEqual(values, expected);
    });
  });
});
