import { createContext } from "react";
import { data } from "../Components/Card/Cards";

export interface SignerApi {
  indvData: data[];
  signers: any;
  fetchSigner: () => Promise<string>;
  data: data[];
  fetchSignerAndDate: () => Promise<void>;
  loading: boolean;
}

export const SignerApi = createContext<SignerApi | null>(null);
