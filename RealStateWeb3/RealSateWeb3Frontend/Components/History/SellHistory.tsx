import React, { useContext } from "react";
import { SignerApi } from "../../ContextApi/signerApi";
import { historyprops } from "./BuyHistory";
import { ethers } from "ethers";

const SellHistory = ({ input, historyData, fetchData }: historyprops) => {
  const value = useContext(SignerApi);

  React.useEffect(() => {
    fetchData("Sell");
  }, [value?.signers, input]);

  return (
    <>
      <div className="historyContainerIndv">
        <div className="key_Container">
          <div className="first">Seller</div>
          <div className="second">Buyer</div>
          <div className="third">Amount</div>
          <div className="fourth">Property_Id</div>
        </div>

        <div className="value_Container">
          {historyData.length === 0 && (
            <div className="Error">Cannot Find Specified Data...</div>
          )}
          {historyData.map((items: any, index: number) => {
            return (
              <div className="value_Indv_Container">
                <div className="first">
                  {items?.seller.slice(0, 5)}... {items?.seller?.slice(37, 42)}
                </div>
                <div className="second">
                  {items?.buyer.slice(0, 5)} ...{items?.buyer?.slice(37, 42)}
                </div>
                <div className="third">
                  {ethers.utils.formatEther(items?.amount)} Eth
                </div>
                <div className="fourth">{Number(items.token_id)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SellHistory;
