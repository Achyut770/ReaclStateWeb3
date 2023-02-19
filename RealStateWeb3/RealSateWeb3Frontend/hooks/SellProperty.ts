import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { ethers } from "ethers";
import { useContext } from "react";
import { SignerApi } from "../ContextApi/signerApi";

const useSellProperty = () => {
  const value = useContext(SignerApi);

  const sellToAuction = async (hash: string, amount: string) => {
    const res = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).sellProperty(hash, ethers.utils.parseEther(amount));
    await res.wait();
  };
  return { sellToAuction };
};
//function sellProperty( string calldata uri , uint Amount) external subscriptionRequired {
export default useSellProperty;
