const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../../ContractInstances");
const { expect } = require("chai");

const SellingPropertyWithId = () => {
  let addr1;
  let ERC721TokenHandler;
  beforeEach(async () => {
    ({ addr1, owner, ERC721TokenHandler } = await ContractInstances());
    await ERC721TokenHandler.connect(addr1).Subscription({
      value: convertEtherToWei("10"),
    });
    await ERC721Token.connect(addr1).MintNft("Achyut");
  });
  it("revert If The token is not valid", async () => {
    await expect(
      ERC721TokenHandler.connect(addr1).sellPropertyWithId(
        2,
        convertEtherToWei("10")
      )
    ).to.be.revertedWith("ERC721: invalid token ID");
  });
  it("revert If The owner of  token id didnt call the function", async () => {
    await ERC721TokenHandler.connect(owner).Subscription({
      value: convertEtherToWei("10"),
    });
    await expect(
      ERC721TokenHandler.connect(owner).sellPropertyWithId(
        1,
        convertEtherToWei("10")
      )
    ).to.be.revertedWith("ERC721: caller is not token owner nor approved");
  });
  it("Struct Should be updated and ownership should be transferred", async () => {
    await ERC721Token.connect(addr1).approve(ERC721TokenHandler.address, 1);
    await ERC721TokenHandler.connect(addr1).sellPropertyWithId(
      1,
      convertEtherToWei("10")
    );
    const res = await ERC721TokenHandler.getsellerDetails(1);
    expect(res.seller).to.equal(addr1.address);
    expect(res.amount).to.equal(convertEtherToWei("10"));
    expect(res.started).to.equal(true);
    expect(res.completed).to.equal(false);

    expect(await ERC721Token.ownerOf(1)).to.equal(ERC721TokenHandler.address);
  });
  it("Should revert if the tokenId is already on sell", async () => {
    await ERC721Token.connect(addr1).approve(ERC721TokenHandler.address, 1);
    await ERC721TokenHandler.connect(addr1).sellPropertyWithId(
      1,
      convertEtherToWei("10")
    );
    await expect(
      ERC721TokenHandler.connect(addr1).sellPropertyWithId(
        1,
        convertEtherToWei("10")
      )
    ).to.be.revertedWith("Already");
  });
};

module.exports = SellingPropertyWithId;
