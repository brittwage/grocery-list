var http = require('http')
var url = require('url')
var items = []

var server = http.createServer(function(req, res){
  switch (req.method) {
    case 'POST': // create item
      var item = ''
      req.setEncoding('utf8')
      req.on('data', function(chunk){
        item += chunk
      })
      req.on('end', function(){
        items.push(item)
        res.write('Added ' + item + '\n')
        res.end()
      })
      break
    case 'GET': // display items
      items.forEach(function(item, i){
        res.write(i + '. ' + item + '\n')
      })
      res.end()
      break
    case 'PUT': // update item
      // DONE get the index from the URL
      var pathname = url.parse(req.url).pathname
      // remove the first '/' character, set this to `i` for index
      var i = pathname.slice(1)
      // DONE get the updated name from the client
      var item = ''
      req.on('data', function(chunk){
        item += chunk
      })
      req.on('end', function(){
        items[i] = item
        res.end()
      })
      // DONE find the list item matching the index
      // DONE update that item to the name received

      break
    case 'DELETE': // delete item
      var pathname = url.parse(req.url).pathname
      var i = parseInt(pathname.slice(1), 10)

      if (isNaN(i)) {
        res.statusCode = 400
        res.end('Item id not valid')
      } else if (!items[i]) {
        res.statusCode = 404
        res.end('Item not found')
      } else {
        items.splice(i, 1)
        res.end('Item deleted successfully')
      }
      break
  }
})

server.listen(8080, function() {
  console.log('listening on 8080')
})
