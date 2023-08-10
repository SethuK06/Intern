const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
//   let id = req.url.split("/")[3];
id = "84bc86ef-90dc-48ae-ad15-cc791bf1b77a"

  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "client is not found",
      })
    );
  } else if (baseUrl === "/clients/" && regexV4.test(id)) {
    try {
    //   let body = await requestBodyparser(req);
    body = {
        "isActive": true,
        "age": 24,
        "name": "Toreto",
        "gender": "female",
        "company": "EMERGENT",
        "email": "kirstensellers@emergent.com",
        "phone": "+1 (831) 564-2190",
        "address": "886 Gallatin Place, Fannett, Arkansas, 4656",
    }
      const index = req.clients.findIndex((client) => {
        return client.id === id;
      });
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "client not found" })
        );
        res.end();
      } else {
        req.clients[index] = { id, ...body };
        writeToFile(req.clients);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.clients[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};