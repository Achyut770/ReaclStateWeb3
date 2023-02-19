import React, { useContext } from "react";

import "./styles/Card.css";
import { useNavigate } from "react-router-dom";
import { BookmarksApi } from "../../ContextApi/Bookmarks";
import Buttons from "../../Children/button";
import NftPopUp from "../YourNft/NftPopUp";

export interface data {
  city: string;
  type: string;
  bathroom?: string;
  bedroom?: string;
  floor?: string;
  parking?: string;
  image: string;
  country: string;
  description: string;
  price: string;
  contact?: string;
  Token_Id: string;
  pool?: string;
  amount: number;
  owner: string;
}

export interface CardProps {
  items: data;
  indvCard?: boolean;
}

function Cards({ items, indvCard }: CardProps) {
  const [indvProperty, setIndvProperty] = React.useState(false);
  const value = useContext(BookmarksApi);
  const navigate = useNavigate();
  const addRemoveBookmarks = (bool: boolean) => {
    let bookmarks = localStorage.getItem("Bookmark");
    if (!bookmarks) return;
    let data = JSON.parse(bookmarks);
    data = { ...data, [items?.Token_Id]: bool };
    localStorage.setItem("Bookmark", JSON.stringify(data));
    value?.fetchBookmarks();
  };

  return (
    <div className="IndvCard">
      {indvProperty && (
        <NftPopUp items={items} setClose={() => setIndvProperty(() => false)} />
      )}
      <div>
        <img src={`https://gateway.pinata.cloud/ipfs/${items.image[0]}`} />
      </div>
      <div className="notImage">
        <div className="typeLocation">
          <div
            className="type"
            onClick={() => !indvCard && navigate(`/buy/${items.Token_Id}`)}
          >
            {items.type}
          </div>
          <div className="location">
            <span>{items.country}</span>,
            <span className="city">{items.city}</span>
          </div>
        </div>
        <div>
          {Number(items.amount) / 10 ** 18} &nbsp;
          <i className="fa-brands fa-ethereum"></i>
        </div>
        <div className="PBaBE">
          <div>
            <span>
              <i className="fa-solid fa-car"></i>
            </span>
            <span>{items.parking}</span>
          </div>
          <div>
            <span>
              <i className="fa-solid fa-sink"></i>
            </span>
            <span>{items.bathroom}</span>
          </div>
          <div>
            <span>
              <i className="fa-solid fa-bed"></i>
            </span>
            <span>{items.bedroom}</span>
          </div>
        </div>
        {!indvCard && (
          <div className="bookmarks">
            {value?.bookmarksData[items.Token_Id] ? (
              <div onClick={() => addRemoveBookmarks(false)}>Y</div>
            ) : (
              <div onClick={() => addRemoveBookmarks(true)}>N</div>
            )}
          </div>
        )}
        {indvCard && (
          <div
            style={{ width: "20%", textAlign: "center" }}
            onClick={() => setIndvProperty(true)}
          >
            <Buttons>Add to Sell</Buttons>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
