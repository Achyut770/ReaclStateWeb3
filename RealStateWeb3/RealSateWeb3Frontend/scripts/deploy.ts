import { ethers } from "hardhat";

const ChangeEtherToWei = (n:string)=>{
  return ethers.utils.parseEther(n)
}

async function main() {
  const [owner , addr1 , addr2] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("ERC721Token");
  const HardhatToken = await Token.deploy();
  const TokenHandler = await ethers.getContractFactory("ERC721Handler");
  const HardhatTokenHandler = await TokenHandler.deploy(HardhatToken.address);

  // subscribing first
  const transact = await HardhatTokenHandler.connect(addr1).Subscription({value :ChangeEtherToWei("0.01") })
  await transact.wait()

  //  Minting nft
  await HardhatToken.connect(addr1).MintNft("QmPJKMZ8c9sPdkEzroLLZU4MfhzuA1DWYaKGGJuRsUfZGS")
  await HardhatToken.connect(addr1).approve(HardhatTokenHandler.address , 1);
  await HardhatTokenHandler.connect(addr1).sellProperty(1,ChangeEtherToWei("0.01"));

    //  Minting nft
  await HardhatToken.connect(addr1).MintNft("QmTVpdY1Po8SRr5Eeb8Ymaff4kMfkvh5GDx9PL6JLHkDQc")
  await HardhatToken.connect(addr1).approve(HardhatTokenHandler.address , 2);
  await HardhatTokenHandler.connect(addr1).sellProperty(2,ChangeEtherToWei("0.01"));

}

//0x5fbdb2315678afecb367f032d93f642f64180aa3
//0xe7f1725e7734ce288f8367e1bb143e90bb3f0512

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

