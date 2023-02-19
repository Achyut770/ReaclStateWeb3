const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../../ContractInstances");
const { expect } = require("chai");

const SellingProperty = () => {
  let addr1;
  let ERC721TokenHandler;
  beforeEach(async () => {
    ({ addr1, owner, ERC721TokenHandler } = await ContractInstances());
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("0.0001"),
    });
  });

  it("Value Should be stored in struct if sellProperty call is successsfull and owner of that nft should be the contract itself ", async () => {
    await ERC721TokenHandler.connect(addr1).sellProperty(
      "Achyut",
      convertEtherToWei("10")
    );
    const res = await ERC721TokenHandler.getsellerDetails(1);

    expect(res.seller).to.equal(addr1.address);
    expect(res.amount).to.equal(convertEtherToWei("10"));
    expect(res.completed).to.equal(false);
    expect(res.started).to.equal(true);

    expect(await ERC721Token.ownerOf(1)).to.equal(ERC721TokenHandler.address);
  });
};

module.exports = SellingProperty;
