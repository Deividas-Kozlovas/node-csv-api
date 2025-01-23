const fs = require("fs");
const http = require("http");
const url = require("url");
const convertCSVtoJSON = require("./helpers/convertCSVtoJSON");

const hostname = "localhost";
const port = 8888;

const userPath = `${__dirname}/data/users.csv`;

const server = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/users":
      try {
        const users = await convertCSVtoJSON(userPath);

        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(users, null, 2));
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error getting users");
      }
      break;

    case "/user":
      try {
        const userId = query.id;
        const users = await convertCSVtoJSON(userPath);
        const individualUser = users.find((user) => user.id === userId);

        if (individualUser) {
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(individualUser, null, 2));
        } else {
          res.writeHead(404, {
            "Content-Type": "text/plain",
          });
          res.end("User not found");
        }
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error getting individual user");
      }
      break;

    default:
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("Endpoint not found.");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
