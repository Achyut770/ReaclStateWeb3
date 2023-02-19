import React from "react";
import "./styles/buySearch.css";
interface BuySeacrh {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

function BuySeacrh({ setSearch, handleSubmit }: BuySeacrh) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="buySearchContainer">
        <input
          type="text"
          onChange={(e) => setSearch(() => e.target.value)}
          required
          placeholder="Search for property using token ID, type, and country name...."
          className="buy_Input"
        />
        <button type="submit" className="home_btn">
          {" "}
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
        </button>
      </form>
    </div>
  );
}

export default BuySeacrh;
