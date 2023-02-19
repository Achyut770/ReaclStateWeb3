import { ethers } from "ethers";
import erc721TokenAbi from "../../RealStateWeb3/artifacts/contracts/ERC721Token.sol/ERC721Token.json";
import erc721TokenHandlerAbi from "../../RealStateWeb3/artifacts/contracts/ERC721Handler.sol/ERC721Handler.json";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
const ContractAddress1 = "0xEAB5A4B41E55143F6da327D62F5358C13578a45d";
const ContractAddress2 = "0x7e56526a87fA552D0f5fbaE6F0afB6FDFeb1039a";

export const ERC721Tokeninstance = new ethers.Contract(
  ContractAddress1,
  erc721TokenAbi.abi,
  provider
);
export const ERC721TokenHandlerinstance = new ethers.Contract(
  ContractAddress2,
  erc721TokenHandlerAbi.abi,
  provider
);
