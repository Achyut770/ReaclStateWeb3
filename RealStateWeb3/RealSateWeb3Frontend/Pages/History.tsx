import React, { useContext } from "react";
import { ERC721TokenHandlerinstance } from "../Utils/ContractsInstance";
import { SignerApi } from "../ContextApi/signerApi";
import BuyHistory from "../Components/History/BuyHistory";
import SellHistory from "../Components/History/SellHistory";
import SubscriptionHistory from "../Components/History/SubscriptionHistory";
import "../Styles/History.css";

function History() {
  const value = useContext(SignerApi);
  const [input, setInput] = React.useState("");
  const [show, setShow] = React.useState([true, false, false]);
  const [sellHistory, setSellHistory] = React.useState<any>([]);
  const [buyHistory, setBuyHistory] = React.useState<any>([]);
  const [subscriptionHistory, setSubscriptionHistory] = React.useState<any>([]);

  // /0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  // To fetch Data.....
  const fetchData = async (dataa: string) => {
    if (!value?.signers._address) return;
    try {
      let address = !input ? value?.signers._address : input;
      let filters = {};
      switch (dataa) {
        case "Sell":
          filters = ERC721TokenHandlerinstance.filters.PropertySold(
            address,
            null,
            null
          );
          break;
        case "Buy":
          filters = ERC721TokenHandlerinstance.filters.PropertyBought(
            address,
            null,
            null
          );
          break;
        case "Subscribe":
          filters = ERC721TokenHandlerinstance.filters.Subscriptionevent(
            address,
            null
          );
      }

      const events = await ERC721TokenHandlerinstance.queryFilter(filters);
      let data: any = [];
      events.map((items) => {
        data.push(items?.args);
      });
      switch (dataa) {
        case "Sell":
          setSellHistory([...data]);
          break;
        case "Buy":
          setBuyHistory([...data]);
          break;
        case "Subscribe":
          setSubscriptionHistory([...data]);
      }
    } catch (error) {
      setSellHistory([]);
      setBuyHistory([]);
      setSubscriptionHistory([]);
      console.log(error);
    }
  };

  //  Handlers.....
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setInput(e.target.value);
    }, 1000);
  };

  const handleShow = (i: number) => {
    setShow((x) => {
      return x.map((items, a) => {
        return i === a ? true : false;
      });
    });
  };

  return (
    <>
      <section className="historyContainer">
        <div className="history_Topic">
          Discover your history here. Initially, a history of connected accounts
          will be provided
        </div>
        <form className="historyform">
          <input
            type="Text"
            onChange={handleChange}
            required
            className="historyInput"
            placeholder="Enter a address..."
          />
        </form>
        <div className="changeContainer">
          <div
            onClick={() => handleShow(0)}
            className={show[0] ? "border" : ""}
          >
            For Sell History
          </div>
          <div
            onClick={() => handleShow(1)}
            className={show[1] ? "border" : ""}
          >
            {" "}
            For Buy History
          </div>
          <div
            onClick={() => handleShow(2)}
            className={show[2] ? "border" : ""}
          >
            For Subscription History
          </div>
        </div>
        <div className="HistoryContainerSBS">
          {show[0] && (
            <SellHistory
              fetchData={fetchData}
              input={input}
              historyData={sellHistory}
            />
          )}
          {show[1] && (
            <BuyHistory
              fetchData={fetchData}
              input={input}
              historyData={buyHistory}
            />
          )}
          {show[2] && (
            <SubscriptionHistory
              fetchData={fetchData}
              input={input}
              historyData={subscriptionHistory}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default History;
