const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/logs') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.appendFileSync('received.log', body + '\n');
      console.log('Log received:', body);
      res.writeHead(200);
      res.end('OK');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(6000, () => {
  console.log('Log receiver running on port 6000');
});
