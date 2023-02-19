const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../../ContractInstances");
const { expect } = require("chai");

const SubscriptionCuurentTimeLess = () => {
  let addr1;
  let ERC721TokenHandler;
  beforeEach(async () => {
    ({ addr1, owner, ERC721TokenHandler } = await ContractInstances());
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("0.0000001"),
    });
  });
  it(" event should be update", async () => {
    // getting timestamp
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp; // This is the timeStamp of The block of line 55
    await expect(
      ERC721TokenHandler.connect(addr1).Subscription({
        value: convertEtherToWei("0.0000001"),
      })
    )
      .to.emit(ERC721TokenHandler, "Subscriptionevent")
      .withArgs(addr1.address, timestampBefore + 3, timestampBefore + 6);
  });
  it(" Struct should be updated ", async () => {
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("0.0000001"),
    });

    const res = await ERC721TokenHandler.getSubscription(addr1.address);
    expect(res).to.equal(timestampBefore + 6);
  });
};

module.exports = SubscriptionCuurentTimeLess;
