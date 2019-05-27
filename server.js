// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const requestIp = require('request-ip')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors')
app.use(cors({optionSuccessStatus: 200}))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let sampleOutput = {
  "ipaddress":"159.20.14.100",
  "language":"en-US,en;q=0.5",
  "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
}

// your first API endpoint... 
app.get("/api/whoami", (req, res) => {
  res.json({
    "ipaddress": requestIp.getClientIp(req),
    "language": req.header('Accept-Language'),
    "software": req.header('User-Agent')
  })
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
