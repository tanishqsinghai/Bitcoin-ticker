const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;
    var options = {
        url: "https://apiv2.bitcoinaverage.com/indices/global",
        method: "GET",
        headers: {
            "Authorization": "tanishqsinghai NDA2MGYwMmFhODRjNDA4OWEzNzU4ZmMxYTdlYTM0NDY"
        },
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    };


    request(options, function(error, response, body) {

        var data = JSON.parse(body);
        var price = data.price;

        res.write("<p>The current date is" + data.time + ".</p>");
        res.write("<h1>" + amount + crypto + " is currently worth " + price + " " + fiat + ".</h1>");
        res.send();

    })
});

app.listen(3000, function(req, res) {
    console.log("server started on port 3000");
});