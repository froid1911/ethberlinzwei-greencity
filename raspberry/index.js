// listen for Start Event of msg sender

const Web3 = require("web3");
const Box = require("3box");
const WalletProvider = require("./wallet-provider");

const provider = new WalletProvider("https://rpc.slock.it/goerli");
provider.getAddress();

const box = await Box.openBox(provider.getAddress(), provider);
const myAppSpace = await box.openSpace("greenberlin");
await thread.post("the message");
