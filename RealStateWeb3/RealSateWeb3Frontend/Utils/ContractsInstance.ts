import { ethers } from "ethers";
import erc721TokenAbi from "../../RealStateWeb3/artifacts/contracts/ERC721Token.sol/ERC721Token.json";
import erc721TokenHandlerAbi from "../../RealStateWeb3/artifacts/contracts/ERC721Handler.sol/ERC721Handler.json";
import { CustomWindow } from "../Children/SignerChildren";

export const provider = new ethers.providers.Web3Provider(
  (window as CustomWindow).ethereum
);
const ContractAddress1 = "0x3Dae0622dC2F26f74859c80063727CE6Dd2AE9c6";
const ContractAddress2 = "0x37224014b342a64c8A2Ef3216FbCc9B3842e3Aa6";

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
