import React, { ReactNode, useEffect } from "react";
import { provider } from "../Utils/ContractsInstance";
import { SignerApi } from "../ContextApi/signerApi";
import { getData } from "../Utils/getData";
import { toast } from "react-toastify";
import { data } from "../Components/Card/Cards";

export interface CustomWindow extends Window {
  ethereum?: any;
}

export interface SignerChildrenProps {
  children: ReactNode;
}

function SignerChildren({ children }: SignerChildrenProps) {
  const [signers, setSigners] = React.useState<any>("");
  const [data, setData] = React.useState<data[]>([]);
  const [indvData, setIndvData] = React.useState<data[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchSigner = async () => {
    const ac = await provider.listAccounts();
    const accounts = await (window as CustomWindow).ethereum?.selectedAddress;
    const signer = provider.getSigner(accounts);
    setSigners(() => signer);
    return signer._address;
  };

  const getDatas = async (address: string) => {
    const { array, indvArray } = await getData(address);
    setData(() => [...array]);
    setIndvData(() => [...indvArray]);
  };

  const fetchSignerAndDate = async () => {
    try {
      setLoading(() => true);
      const address = await fetchSigner();
      await getDatas(address);
      setLoading(() => false);
    } catch (error) {
      setLoading(() => false);
    }
  };

  useEffect(() => {
    (window as CustomWindow).ethereum?.on("accountsChanged", () => {
      fetchSigner();
    });
    if ((window as CustomWindow).ethereum) {
      fetchSignerAndDate();
    } else {
      toast.error("Plz install Metamask");
    }
  }, []);
  const value = {
    indvData,
    signers,
    fetchSigner,
    data,
    fetchSignerAndDate,
    loading,
  };
  return <SignerApi.Provider value={value}>{children}</SignerApi.Provider>;
}

export default SignerChildren;
