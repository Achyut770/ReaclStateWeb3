const ContractInstances = async () => {
  [owner, addr1, addr2] = await ethers.getSigners();
  Tokens = await ethers.getContractFactory("ERC721Token");
  ERC721Token = await Tokens.deploy();
  Tokens2 = await ethers.getContractFactory("ERC721Handler");
  ERC721TokenHandler = await Tokens2.deploy(ERC721Token.address);
  return { owner, addr1, addr2, ERC721TokenHandler, ERC721Token };
};

module.exports = ContractInstances;
