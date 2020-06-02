export default async function readAll(stream) {
  const reader = stream.getReader();
  let buffer = [];

  return reader.read().then(function process(result) {
    if (result.done) {
      return buffer;
    }

    buffer.push(result.value);
    return reader.read().then(process);
  });
};
