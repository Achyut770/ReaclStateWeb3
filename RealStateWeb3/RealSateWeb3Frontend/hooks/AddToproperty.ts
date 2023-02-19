import {
  ERC721TokenHandlerinstance,
  ERC721Tokeninstance,
} from "../Utils/ContractsInstance";
import { BigNumber, ethers } from "ethers";
import { useContext } from "react";
import { SignerApi } from "../ContextApi/signerApi";

const useAddProperty = () => {
  const value = useContext(SignerApi);

  const sellPropertyById = async (
    token_Id: string | undefined,
    etherAmount: string
  ) => {
    let amount = ethers.utils.parseEther(etherAmount);
    console.log(amount);
    const resApprove = await ERC721Tokeninstance.connect(
      value?.signers
    ).approve(ERC721TokenHandlerinstance.address, token_Id);
    await resApprove.wait();
    const res = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).sellPropertyWithId(token_Id, amount);
    await res.wait();
  };
  return { sellPropertyById };
};
export default useAddProperty;
