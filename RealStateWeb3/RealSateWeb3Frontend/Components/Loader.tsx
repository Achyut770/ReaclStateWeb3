import React from "react";
import "./styles/Loader.css";
import Buttons from "../Children/button";

const Loader = () => {
  return (
    <>
      <div className="Loader_Container"></div>
      <div className="Loader_Main_Container">
        <div className="please_Wait">Please Wait It Will Take Some time..</div>
      </div>
    </>
  );
};

export default Loader;

export const PopUp = ({
  hash,
  setClose,
}: {
  hash: string;
  setClose: () => void;
}) => {
  async function copy() {
    await navigator.clipboard.writeText(
      `https://gateway.pinata.cloud/ipfs/${hash}`
    );
  }

  return (
    <>
      <div className="Loader_Container"></div>
      <div className="Loader_Main_Container">
        <div className="please_Wait popUp">
          {" "}
          <div>You can check your property Details here.</div>{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href={`https://gateway.pinata.cloud/ipfs/${hash}`}>
            {" "}
            {hash}
          </a>{" "}
          <button onClick={() => copy()}>
            <i className="fa-regular fa-copy fa-xl"></i>
          </button>
        </div>
        <button onClick={() => setClose()}>
          <Buttons>Cancel</Buttons>
        </button>
      </div>
    </>
  );
};
