const convertEtherToWei = require("../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const BuyAndCancelling = () => {
  let addr1;
  let ERC721TokenHandler;
  beforeEach(async () => {
    ({ addr1, owner, ERC721TokenHandler } = await ContractInstances());
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("100"),
    });

    await ERC721TokenHandler.connect(addr1).sellProperty(
      "Achyut",
      convertEtherToWei("10")
    );
  });
  it("Reverts if somemone otherthan owner tries to cancel the property", async () => {
    await expect(
      ERC721TokenHandler.cancelSellingProperty(1)
    ).to.be.revertedWith("You are not the owner of the property");
  });

  it("Struct should be updated when property is cancelled", async () => {
    await ERC721TokenHandler.connect(addr1).cancelSellingProperty(1);
    const res = await ERC721TokenHandler.getsellerDetails(1);
    expect(res.completed).to.equal(true);
    expect(res.started).to.equal(false);
  });

  it("Property Cannot be bought if It is Cancelled", async () => {
    await ERC721TokenHandler.connect(addr1).cancelSellingProperty(1);

    await expect(
      ERC721TokenHandler.connect(addr2).buyProperty(1)
    ).to.be.revertedWith("Already Sold");
  });

  it("Should be reverted If amount dosenot match the required amount While buying property", async () => {
    await expect(
      ERC721TokenHandler.connect(addr2).buyProperty(1, {
        value: convertEtherToWei("1"),
      })
    ).to.be.revertedWith("Not enough amount");
  });

  it("When successfull the struct and events should be updated while buying property", async () => {
    await expect(
      ERC721TokenHandler.connect(addr2).buyProperty(1, {
        value: convertEtherToWei("10"),
      })
    )
      .to.emit(ERC721TokenHandler, "PropertySold")
      .withArgs(addr1.address, convertEtherToWei("10"), 1, addr2.address);

    const res = await ERC721TokenHandler.getsellerDetails(1);
    expect(res.completed).to.equal(true);

    expect(await ERC721TokenHandler.getBalance()).to.equal(
      convertEtherToWei("100")
    );
  });

  it("Get Balance", async () => {
    expect(await ERC721TokenHandler.getBalance()).to.equal(
      convertEtherToWei("100")
    );
  });

  it("Send Eth value Cannot be called by other than owner", async () => {
    await expect(
      ERC721TokenHandler.connect(addr1).sendEth(convertEtherToWei("0.00001"))
    ).to.be.revertedWith("Only owner of contract is allowed");
  });
  it("Balance of owner and smart contract is updated when sendEth function is  called by owner", async () => {
    await expect(
      ERC721TokenHandler.connect(owner).sendEth(convertEtherToWei("90"))
    ).to.changeEtherBalances(
      [ERC721TokenHandler.address, owner],
      [convertEtherToWei("-90"), convertEtherToWei("90")]
    );
  });
};

module.exports = BuyAndCancelling;
