import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { BigNumber } from "ethers";
import { useContext } from "react";
import { SignerApi } from "../ContextApi/signerApi";

const useBuyProperty = () => {
  const value = useContext(SignerApi);

  const BuyProperty = async (
    token_Id: string | undefined,
    amount: number | undefined
  ) => {
    const etherAmount = BigNumber.from(amount?.toString());
    const res = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).buyProperty(token_Id, { value: etherAmount });
    await res.wait();
  };
  return { BuyProperty };
};
//function sellProperty( string calldata uri , uint Amount) external subscriptionRequired {
export default useBuyProperty;
