import React from "react";
import "../Styles/subscription.css";
import SubscriptionCard from "../Components/Card/SubscriptionCard";
import SubscriptionManual from "../Components/Subscription/SubscriptionManual";
import Loader from "../Components/Loader";
import useFreeSubscription from "../hooks/useFreeSubscription";
import { toast } from "react-toastify";

const subscriptionData = [
  {
    name: "1 month",
    ether: "0.0864",
    days: 30,
  },
  {
    name: "3 months",
    ether: "0.2592",
    days: 90,
  },
  {
    name: "6 months",
    ether: "0.5184",
    days: 180,
  },
  {
    name: "1 year",
    ether: "1.0512",
    days: 365,
  },
];

function Subscription() {
  const [loader, setLoader] = React.useState(false);
  const freeSubscription = useFreeSubscription();

  const handleSubmit = async () => {
    try {
      setLoader(() => true);
      await freeSubscription();
      toast.success("Free subscription for 1 month activated");
      setLoader(() => false);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="subscription_Container">
        <div className="big_Small">
          <div className="big"> More Than 20.000 Sellers Cannot be Wrong.</div>
          <div className="small">
            Now its your turn.Try Realty Zone For{" "}
            <span className="free" onClick={() => handleSubmit()}>
              Free!
            </span>
          </div>
        </div>
        <div className="SubscriptionCard"></div>
        <div className="Subcription_Card_Container">
          {subscriptionData.map((items, index) => {
            return <SubscriptionCard items={items} setLoader={setLoader} />;
          })}
        </div>
        <div>
          <SubscriptionManual setLoader={setLoader} />
        </div>
      </div>
    </>
  );
}

export default Subscription;
