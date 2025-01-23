const http = require("http");
const url = require("url");
const convertCSVtoJSON = require("./modules/convertCSVtoJSON");

const hostname = "localhost";
const port = 8888;

const userPath = `${__dirname}/data/users.csv`;
const paymentsPath = `${__dirname}/data/payments.csv`;

const server = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  const sendJSONResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(data, null, 2));
  };

  switch (pathname) {
    case "/users":
      try {
        const users = await convertCSVtoJSON(userPath);
        sendJSONResponse(res, 200, users);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
      break;

    case "/user":
      try {
        const userId = query.id;
        const users = await convertCSVtoJSON(userPath);
        const user = users.find((u) => u.id === userId);

        if (user) {
          sendJSONResponse(res, 200, user);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("User not found");
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
      break;

    case "/user/payments":
      try {
        const userId = query.id;
        const payments = await convertCSVtoJSON(paymentsPath);
        const userPayments = payments.filter(
          (payment) => payment.userId === userId
        );

        if (userPayments.length > 0) {
          sendJSONResponse(res, 200, userPayments);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("No payments found for this user");
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
      break;

    case "/payment":
      try {
        const paymentId = query.id;
        const payments = await convertCSVtoJSON(paymentsPath);
        const payment = payments.find((p) => p.id === paymentId);

        console.log(paymentsPath);

        if (payment) {
          const user = (await convertCSVtoJSON(userPath)).find(
            (u) => u.id === payment.userId
          );
          payment.user = user || {};
          sendJSONResponse(res, 200, payment);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Payment not found");
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Endpoint not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
