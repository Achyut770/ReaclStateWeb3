import React, { useContext } from "react";
import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { SignerApi } from "../ContextApi/signerApi";
const useFreeSubscription = () => {
  const value = useContext(SignerApi);

  const freeSubscription = async () => {
    const res = await ERC721TokenHandlerinstance.connect(
      value?.signers
    ).freeSubscription();
    await res.wait();
  };

  return freeSubscription;
};

export default useFreeSubscription;
