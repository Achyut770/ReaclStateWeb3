import React, { useContext } from "react";
import BuySeacrh from "../Components/Buy/BuySeacrh";
import BuyWhole from "../Components/BuyWhole";
import "../Styles/Buy.css";
import { BuySearchApi } from "../ContextApi/BuySearch";
import buySearch from "../Utils/buySearch";
import { SignerApi } from "../ContextApi/signerApi";

function Buy() {
  const [search, setSearch] = React.useState("");
  const value = useContext(BuySearchApi);
  const dataValue = useContext(SignerApi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    value?.setData(() => buySearch(dataValue?.data, search));
  };

  return (
    <div>
      <div>
        <BuySeacrh handleSubmit={handleSubmit} setSearch={setSearch} />
      </div>
      <BuyWhole items={value?.data} hide={true} />
    </div>
  );
}

export default Buy;
