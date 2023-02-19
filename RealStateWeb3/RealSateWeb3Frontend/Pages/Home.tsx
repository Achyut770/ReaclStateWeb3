import React from "react";
import "../Styles/Home.css";
import BuyWhole from "../Components/BuyWhole";
import { data } from "../Components/Card/Cards";
import { useContext } from "react";
import { BuySearchApi } from "../ContextApi/BuySearch";
import { useNavigate } from "react-router-dom";

import { SignerApi } from "../ContextApi/signerApi";
import buySearch from "../Utils/buySearch";

function Home() {
  const [searchValue, setSearchValue] = React.useState("");
  const [data, setData] = React.useState<data[]>([]);

  const navigate = useNavigate();
  const value = useContext(BuySearchApi);
  const dataValue = useContext(SignerApi);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    value?.setData(() => buySearch(dataValue?.data, searchValue));
    navigate("/buy");
  };

  React.useEffect(() => {
    setData([]);

    dataValue?.data.map((items, index) => {
      if (index >= 4) return;
      setData((x) => [...x, items]);
    });
  }, [dataValue?.data]);

  return (
    <div className="img_B">
      <div className="middle img">
        <div className="Saying">
          <div className="Sologan">Security the difference with us.</div>
          <div className="sub_Sologan">
            Artificial intelligence (AI) and machine learning algorithms that
            can provide personalized recommendations or help users find
            properties that match their specific needs and preferences
          </div>
          <div></div>
        </div>
        <form onSubmit={handleSubmit} className="Form">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="Home_Input"
            required
            placeholder="Search for property using token ID, type, and country name....."
          />
          <button type="submit" className="home_btn">
            {" "}
            <i className="fa-solid fa-magnifying-glass fa-2x"></i>
          </button>
        </form>
      </div>

      <BuyWhole items={data} hide={false} />
    </div>
  );
}

export default Home;
