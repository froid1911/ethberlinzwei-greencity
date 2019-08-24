// listen for Start Event of msg sender

const Web3 = require("web3");
const Box = require("3box");
// const WalletProvider = require("./wallet-provider");
const WalletProvider = require("truffle-hdwallet-provider");

const provider = new WalletProvider(
  "tag tone tape sweet biology festival turtle atom glass casual insect popular",
  "https://rpc.slock.it/goerli"
);
provider.getAddress();

let box;
let space;
let thread;
let profile;

const openBox = async () => {
  box = await Box.openBox(provider.getAddress(), provider);
  space = await box.openSpace("greenberlin");
};

const getProfile = async () => {
  profile = await Box.getProfile(provider.getAddress());
  console.log(profile);
};

const joinThread = async () => {
  thread = await space.joinThread(provider.getAddress());
};

const sendMessageToThread = async message => {
  await thread.post(message);
};

const getPosts = async thread => {
  const posts = await thread.getPosts();
  console.log(posts);
};

const run = async () => {
  await openBox();
  await getProfile();
  await joinThread();
  await sendMessageToThread("hallo");
  await getPosts(thread);
};

run();
