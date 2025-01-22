const fs = require("fs");
const http = require("http");
const url = require("url");

const hostname = "localhost";
const port = 8888;

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  res.end(
    `You requested path: ${pathname}\nWith query: ${JSON.stringify(query)}`
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
