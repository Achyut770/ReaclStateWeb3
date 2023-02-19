import React from "react";
import PropertyDetails from "../IndvBuy/PropertyDetails";
import { data } from "../Card/Cards";
import "./styles/NftPopUp.css";
import Loader from "../Loader";

const NftPopUp = ({
  items,
  setClose,
}: {
  items: data;
  setClose: () => void;
}) => {
  const [loader, setLoader] = React.useState(false);
  return (
    <>
      {loader && <Loader />}
      <div className="nft_Property_Popup" onClick={() => setClose()}></div>
      <div className="nft_Property_Popup_Details">
        <PropertyDetails
          items={items}
          fromIndvProperty
          loader={loader}
          setLoader={setLoader}
        />
      </div>
    </>
  );
};

export default NftPopUp;
