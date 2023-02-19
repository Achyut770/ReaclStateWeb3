import React, { useContext } from "react";
import { SignerApi } from "../../ContextApi/signerApi";
import { historyprops } from "./BuyHistory";

const SubscriptionHistory = ({
  input,
  historyData,
  fetchData,
}: historyprops) => {
  const value = useContext(SignerApi);

  const TimeStampToDate = (timestamp: number) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  React.useEffect(() => {
    fetchData("Subscribe");
  }, [value?.signers, input]);

  return (
    <>
      <div className="historyContainerIndv">
        <div className="key_Container">
          <div className="first">Subscriber</div>
          <div className="second">Form</div>
          <div className="third">To.</div>
        </div>
        <div className="value_Container">
          {historyData.length === 0 && (
            <div className="Error">Cannot Find Specified Data...</div>
          )}
          {historyData.map((items: any) => {
            return (
              <div className="value_Indv_Container">
                <div className="first">
                  {items?.subscriber.slice(0, 5)}....
                  {items?.subscriber?.slice(37, 42)}
                </div>
                <div className="second">
                  {TimeStampToDate(Number(items.from))}
                </div>
                <div className="third">{TimeStampToDate(Number(items.to))}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SubscriptionHistory;
