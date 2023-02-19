import React, { useContext } from "react";
import { data } from "./Cards";
import "./styles/PropertySideCard.css";
import { useNavigate } from "react-router-dom";
import Buttons from "../../Children/button";
import { BookmarksApi } from "../../ContextApi/Bookmarks";
interface PropertySideProps {
  items: data;
}

function PropertySideCard({ items }: PropertySideProps) {
  const value = useContext(BookmarksApi);

  const addRemoveBookmarks = (bool: boolean) => {
    let bookmarks = localStorage.getItem("Bookmark");
    if (!bookmarks) return;
    let data = JSON.parse(bookmarks);
    data = { ...data, [items.Token_Id]: bool };
    console.log(data);
    localStorage.setItem("Bookmark", JSON.stringify(data));
    value?.fetchBookmarks();
  };

  const [num, setNum] = React.useState(0);
  const navigate = useNavigate();
  return (
    <div className="SideProperty_Indv">
      <div className="SideProperty_Indv_Left">
        <img
          className="propertySideImage"
          src={`https://gateway.pinata.cloud/ipfs/${items.image[num]}`}
          alt="HouseImage"
        />
        <span
          className="prev "
          onClick={() =>
            num === 0 ? setNum(items.image.length - 1) : setNum((x) => x - 1)
          }
        >
          <i className="fa-solid fa-circle-arrow-left arrow"></i>
        </span>
        <span
          className=" next "
          onClick={() =>
            num === items.image.length - 1 ? setNum(0) : setNum((x) => x + 1)
          }
        >
          <i className="fa-solid fa-circle-arrow-right arrow"></i>
        </span>

        <div className="bookmarks">
          {value?.bookmarksData[items?.Token_Id] ? (
            <div onClick={() => addRemoveBookmarks(false)}>Y</div>
          ) : (
            <div onClick={() => addRemoveBookmarks(true)}>N</div>
          )}
        </div>
      </div>
      <div className="SideProperty_Indv_Right">
        <div>{items.type}</div>
        <div>
          {" "}
          <span>{items.country} </span> <span>{items.city}</span>
        </div>
        <div>
          {items.amount / 10 ** 18} &nbsp;
          <i className="fa-brands fa-ethereum"></i>
        </div>

        <div className="PBB">
          <span>
            <i className="fa-solid fa-car"></i>
            {items.parking}
          </span>
          <span>
            <i className="fa-solid fa-sink"></i>
            {items.bathroom}
          </span>
          <span>
            <i className="fa-solid fa-bed"></i>
            {items.bedroom}
          </span>
        </div>
        <div></div>
        <div>{items.description.slice(0, 15)}...</div>
        <button onClick={() => navigate(`/buy/${items.Token_Id}`)}>
          <Buttons>View More</Buttons>
        </button>
      </div>
    </div>
  );
}

export default PropertySideCard;
