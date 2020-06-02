# flora

> __whatwg-flora-tmpl__ on npm.

Streaming templates using WhatWG Streams based on the [Flora](https://www.npmjs.com/package/flora-tmpl) Node Streams templating engine.

![Streaming HTML](https://user-images.githubusercontent.com/361671/32578154-2abd05a6-c4aa-11e7-95bd-1dc39729c8fc.gif)

# Why

HTML is a format that can be streamed. Meaning the browser can start parsing and showing parts of a web page before the full thing has been downloaded. Your application probably has things it needs to do that take some time; like make database requests.

Parts of your page depend on this data, but much of it does not. Whatwg-Flora allows you to write templates that get to the client as quickly as possible, because only the parts that need to wait, do wait.

## Install

```shell
yarn add whatwg-flora-tmpl
```

## Usage

```js
import template from 'whatwg-flora-tmpl';

const items = [1,2,3,4];

template`
    <h1>${items.length} doubles</h1>
    <ul>
      ${items.map(i => template`<li>${i * 2}</li>`)};
    </ul>
  `;
```

## License

BSD 2 Clause
