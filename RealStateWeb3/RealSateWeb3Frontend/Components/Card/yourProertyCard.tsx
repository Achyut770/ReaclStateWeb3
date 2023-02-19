import React from "react";
import { data } from "./Cards";

const YourProertyCard = ({ items }: { items: data }) => {
  console.log(items);
  return (
    <>
      <div>
        <img src={`https://gateway.pinata.cloud/ipfs/${items.image[0]}`} />
      </div>
    </>
  );
};

export default YourProertyCard;
