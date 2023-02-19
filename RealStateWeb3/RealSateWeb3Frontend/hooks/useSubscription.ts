import React, { useContext } from "react";
import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { SignerApi } from "../ContextApi/signerApi";
import { ethers } from "ethers";

const useSubscription = () => {
  const value = useContext(SignerApi);
  const subscribe = async (amount: string) => {
    const values = ethers.utils.parseUnits(amount, "ether");
    const transaction = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).Subscription({ value: values });
    await transaction.wait();
  };
  return subscribe;
};

export default useSubscription;
