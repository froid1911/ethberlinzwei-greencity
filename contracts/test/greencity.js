const ECOin = artifacts.require("ECOin");
const Greencity = artifacts.require("Greencity");

contract("Greencity tests", async accounts => {
  it("have 0 balance in account 0", async () => {
    let ecoin = await Ecoin.deployed();
    let balance = await ecoin.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 0);
  });

  // it("should have set GC as minter", async accounts => {
  //   let ecoin = await Ecoin.deployed();
  //   let gc = await Greencity.deployed();
  //
  //   await ecoin.addMinter(gc.address);
  //   let isMinter = await ecoin.isMinter(gc.address);
  //   assert.isTrue(isMinter);
  // });
});
