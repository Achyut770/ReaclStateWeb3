import React from "react";
import { data } from "../Card/Cards";
import PropertySideCard from "../Card/PropertySideCard";

interface PropertySideProps {
  items: data[];
}

function PropertySide({ items }: PropertySideProps) {
  if (!items) {
    return <div>Loading....</div>;
  }
  return (
    <div className="property_Side_Container">
      {items.map((val, index) => {
        return <PropertySideCard items={val} />;
      })}
    </div>
  );
}

export default PropertySide;
