import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardProps, data } from "../Components/Card/Cards";
import "../Styles/IndvBuy.css";
import PropertyDetails from "../Components/IndvBuy/PropertyDetails";
import PropertySide from "../Components/IndvBuy/PropertySide";
import { SignerApi } from "../ContextApi/signerApi";

function IndvBuy() {
  const [data, setData] = React.useState<data>();
  const [secondData, setSecondData] = React.useState<data[]>([]);
  const { token_ID } = useParams();
  const value = useContext(SignerApi);

  React.useEffect(() => {
    setSecondData([]);
    value?.data.map((items, index) => {
      if (items.Token_Id == token_ID) {
        return setData(items as data);
      }
      setSecondData((x) => [...x, items]);
    });
  }, [token_ID, value?.data]);
  return (
    <div className="IndvContainer">
      <div className="left_Indv">
        <PropertyDetails items={data} />
      </div>
      <div className="right_Indv">
        <PropertySide items={secondData} />
      </div>
    </div>
  );
}

export default IndvBuy;
