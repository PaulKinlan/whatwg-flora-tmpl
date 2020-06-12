export default async function readAll(stream) {
  const reader = stream.getReader();
  let buffer = [];
  const decoder = new TextDecoder('utf8');

  return reader.read().then(function process(result) {
    if (result.done) {
      return buffer;
    }

    buffer.push(decoder.decode(result.value));
    return reader.read().then(process);
  });
};
