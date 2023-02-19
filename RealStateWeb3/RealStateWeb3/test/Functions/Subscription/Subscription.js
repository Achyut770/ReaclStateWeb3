const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../../ContractInstances");
const { expect } = require("chai");

const Subscription = () => {
  let addr1;
  let ERC721TokenHandler;
  beforeEach(async () => {
    ({ addr1, owner, ERC721TokenHandler } = await ContractInstances());
  });
  it("Revert when the amount is send as is less then specified", async () => {
    await expect(ERC721TokenHandler.Subscription()).to.be.revertedWith(
      "You cantnot send less than 10000000 wei"
    );
  });
  it("Balances of addr1 and contract be updated ", async () => {
    await expect(
      ERC721TokenHandler.connect(addr1).Subscription({
        value: convertEtherToWei("1"),
      })
    ).to.changeEtherBalances(
      [ERC721TokenHandler.address, addr1],
      [convertEtherToWei("1"), convertEtherToWei("-1")]
    );
  });
  it(" event should be updated (When currentTime is more then the the previously Subscribed Time)", async () => {
    // getting timestamp
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp + 1; // +1 because Subscription is called after one second .
    await expect(
      ERC721TokenHandler.connect(addr1).Subscription({
        value: convertEtherToWei("0.0000001"),
      })
    )
      .to.emit(ERC721TokenHandler, "Subscriptionevent")
      .withArgs(addr1.address, timestampBefore, timestampBefore + 3);
  });
  it(" Struct should be updated (When currentTime is more then the the previously Subscribed Time)", async () => {
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("0.0000001"),
    });
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    const res = await ERC721TokenHandler.getSubscription(addr1.address);
    expect(res).to.equal(timestampBefore + 3);
  });
};

module.exports = Subscription;
