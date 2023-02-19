import React from "react";
import { useContext } from "react";
import { SignerApi } from "../../ContextApi/signerApi";
import BuyWhole from "../BuyWhole";
import "./styles/NftContainer.css";

const NftContainer = () => {
  const value = useContext(SignerApi);

  return (
    <>
      <div className="Nft_Container">
        {value?.loading ? (
          <div className="plzBuyAndSell">...Loading...</div>
        ) : value?.indvData.length === 0 ? (
          <div className="plzBuyAndSell">Plz Buy Or sell Some property</div>
        ) : (
          <BuyWhole items={value?.indvData} hide indvCard />
        )}
      </div>
    </>
  );
};

export default NftContainer;
