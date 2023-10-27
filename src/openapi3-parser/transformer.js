const data = import('./api-doc-json.json')

function transform(data) {
  return data.openapi
}

console.log(transform(data))
