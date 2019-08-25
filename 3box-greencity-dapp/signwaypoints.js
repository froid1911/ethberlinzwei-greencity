const Web3 = require("web3");
const web3 = new Web3("https://rpc.slock.it/goerli");
const accounts = web3.eth.accounts.create();
const didJWT = require("did-jwt");
const waypoints = require("./goodTrip.json");
const fs = require("fs");
const coords = [];
const promisses = [];
var file = fs.createWriteStream("goerliroute.json");
waypoints.trip.GpsWaypoints.forEach(element => {
  promisses.push(
    didJWT
      .createJWT(element.payload, {
        alg: "ES256K-R",
        signer: didJWT.SimpleSigner(accounts.privateKey),
        issuer: "did:ethr:" + accounts.address
      })
      .then(jwt => coords.push(jwt))
  );
});

Promise.all(promisses).then(() => {
  fs.writeFile("./goerliroute.json", JSON.stringify(coords), err =>
    console.log(err)
  );
});
