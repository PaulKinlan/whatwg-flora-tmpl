import tmpl from '../lib/index.js';
import streams from "web-streams-polyfill";

const read = (stream) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  return reader.read().then(function process(result) {
    if (result.done) {
      return;
    }

    console.log(decoder.decode(result.value));
    return reader.read().then(process);
  });
};

const encoder = new TextEncoder();
const title = 'Awesome';

tmpl`<html>
  <head>
    <title>${title}</title>
  </head>
<body>
${new streams.ReadableStream({
  start(controller) {
    let counter = 0;
    const interval = setInterval(async () => { 
      controller.enqueue(encoder.encode(`<li>${counter++}</li>`));
      if (counter >= 10) {
        controller.close();
        clearInterval(interval);
      }
    }, 1000)
  }
})}
</body>`.then(read);
