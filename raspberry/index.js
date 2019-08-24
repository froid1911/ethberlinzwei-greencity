// listen for Start Event of msg sender
const express = require("express");
const Web3 = require("web3");
const Box = require("3box");
// const WalletProvider = require("./wallet-provider");
const WalletProvider = require("truffle-hdwallet-provider");
const didJWT = require("did-jwt");

const app = express();
app.post("/claim", function(req, res) {});

app.listen(8000, () => {
  console.log("started");
});

const provider = new WalletProvider(
  "grant traffic cash increase nerve mixture pact host right win antenna wing",
  "https://rpc.slock.it/goerli"
);
provider.getAddress();

let box;
let space;
let thread;
let profile;
let spaceDid;

const openBox = async () => {
  box = await Box.openBox(provider.getAddress(), provider);
  space = await box.openSpace("greenberlin2");
  spaceDid = space.did;
};

const getProfile = async () => {
  profile = await Box.getProfile(provider.getAddress());
};

const joinThread = async () => {
  thread = await space.joinThread(provider.getAddress());
};

const sendMessageToThread = async message => {
  await thread.post(message);
};

const issueClaim = async claim => {
  const jwt = await didJWT.createJWT(
    {
      sub: spaceDid,
      iss: "",
      iat: Math.floor(Date.now() / 1000),
      claim: {
        twitter_handle: "bla",
        twitter_proof: "http"
      }
    },
    {
      issuer: "did:ethr:0xAcAb737f119F0926768218D50181F770724f7237",
      alg: "ES256K-R",
      signer: didJWT.SimpleSigner(
        "cf46821612c03d50ff469ad04a10f4d9794be107db7c98621aafbc23aca90e00"
      )
    }
  );
  console.log(jwt);
  console.log(await didJWT.decodeJWT(jwt));
  return jwt;
};

const getPosts = async thread => {
  const posts = await thread.getPosts();
  console.log(posts);
};

const run = async () => {
  issueClaim({ lat: 12, lng: 10 });
  //   await openBox();
  //   await getProfile();
  //   // await linkAddress();
  //   await joinThread();
  //   const claim = await issueClaim(null);
  //   await sendMessageToThread(claim);
  //   await getPosts(thread);
};

// run();
