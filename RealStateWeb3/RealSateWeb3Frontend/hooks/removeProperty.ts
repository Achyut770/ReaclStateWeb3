import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { ethers } from "ethers";
import { useContext } from "react";
import { SignerApi } from "../ContextApi/signerApi";

const useCancelProperty = () => {
  const value = useContext(SignerApi);

  const CancelProperty = async (id: string | undefined) => {
    const res = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).cancelSellingProperty(id);
    await res.wait();
  };
  return { CancelProperty };
};
//function sellProperty( string calldata uri , uint Amount) external subscriptionRequired {
export default useCancelProperty;
