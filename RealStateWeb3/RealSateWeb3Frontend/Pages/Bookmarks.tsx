import React, { useContext } from "react";
import { BookmarksApi } from "../ContextApi/Bookmarks";
import BuyWhole from "../Components/BuyWhole";
import "../Styles/Bookmarks.css";
import { SignerApi } from "../ContextApi/signerApi";
import { data } from "../Components/Card/Cards";

function Bookmarks() {
  const value = useContext(BookmarksApi);
  const datas = useContext(SignerApi);
  const [data, setData] = React.useState<data[]>([]);

  const fetchBookmarks = () => {
    let array: data[] = [];
    console.log("1");

    datas?.data.map((items: data) => {
      {
        if (value?.bookmarksData[items?.Token_Id]) {
          array.push(items);
        }
      }
    });
    setData([...array]);
  };

  React.useEffect(() => {
    fetchBookmarks();
  }, [value?.bookmarksData, datas?.data]);
  return (
    <>
      <div className="bookMarksTopic">
        {" "}
        Your bookmarks will be displayed Here.
      </div>
      <div className="bookMarksTopic">
        {data.length === 0 && "Add Property To Bookmarks "}
      </div>
      <div className="bookmarksCardContainer">
        <BuyWhole items={data} hide />
      </div>
    </>
  );
}

export default Bookmarks;
