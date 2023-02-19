import React, { useContext } from "react";
import Cards, { data } from "./Card/Cards";
import "./styles/BuyWhole.css";
import { useNavigate } from "react-router-dom";
import { SignerApi } from "../ContextApi/signerApi";
interface buyWholeProps {
  items: data[] | undefined;
  hide: boolean;
  indvCard?: boolean;
}

function BuyWhole({ items, hide, indvCard }: buyWholeProps) {
  const navigate = useNavigate();
  const value = useContext(SignerApi);
  return (
    <div className="buyWhole_Container">
      {!hide && (
        <div className="Buy_House_Top">
          <div className="Buy_House_Top_Left">
            <div className="border_Left"></div>
            <div>Properties</div>
          </div>
          <div className="view_More" onClick={() => navigate("buy")}>
            View More<i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      )}
      <div className="card_Container">
        {value?.loading ? (
          <div>...Loading...</div>
        ) : items?.length === 0 ? (
          <div>No items to show</div>
        ) : (
          items?.map((items, index) => {
            return <Cards items={items} indvCard={indvCard} />;
          })
        )}
      </div>
    </div>
  );
}

export default BuyWhole;
