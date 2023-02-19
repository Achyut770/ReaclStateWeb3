import React, { useContext } from "react";
import Buttons from "../../Children/button";
import { ERC721TokenHandlerinstance } from "../../Utils/ContractsInstance";
import { SignerApi } from "../../ContextApi/signerApi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "./styles/subscriptionCard.css";
import useSubscription from "../../hooks/useSubscription";

interface subscriptionCardProps {
  items: {
    name: string;
    days: number;
    ether: string;
  };
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubscriptionCard({ items, setLoader }: subscriptionCardProps) {
  const value = useContext(SignerApi);
  const subscribe = useSubscription();

  const setSubscription = async (ether: string) => {
    try {
      console.log(value?.signers);
      setLoader(() => true);
      await subscribe(ether);
      toast.success("Successfully Subscribed");
      setLoader(() => false);
    } catch (error) {
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
  };

  return (
    <div className="subscriptionCardContainer">
      <div>{items.name}</div>
      <div className="eth">{items.ether}Eth</div>
      <div>
        Enjoy The full {items.days} days of subscription for full length . At no
        additional Cost
      </div>
      <button onClick={() => setSubscription(items.ether)}>
        <Buttons>Book Now </Buttons>
      </button>
    </div>
  );
}

export default SubscriptionCard;
