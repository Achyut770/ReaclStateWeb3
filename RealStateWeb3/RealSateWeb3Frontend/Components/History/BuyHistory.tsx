import React, { useContext } from "react";
import { SignerApi } from "../../ContextApi/signerApi";
import { ethers } from "ethers";
import "./styles/Histories.css";
export interface historyprops {
  input: string;
  historyData: any;
  fetchData: (dataa: string) => void;
}

const BuyHistory = ({ input, historyData, fetchData }: historyprops) => {
  const value = useContext(SignerApi);

  React.useEffect(() => {
    fetchData("Buy");
  }, [value?.signers, input]);
  return (
    <>
      <div className='historyContainerIndv'>
        <div className='key_Container'>
          <div className='first'>Buyer</div>
          <div className='second'>Seller</div>
          <div className='third'>Amount</div>
          <div className='fourth'> Property_Id</div>
        </div>
        <div className='value_Container'>
          {historyData.length === 0 && (
            <div className='Error'>Cannot Find Specified Data...</div>
          )}

          {historyData.map((items: any, index: number) => {
            return (
              <div key={index} className='value_Indv_Container'>
                <div className='first'>
                  {items?.buyer.slice(0, 5)} {items?.buyer?.slice(37, 42)}
                </div>
                <div className='second'>
                  {items?.seller.slice(0, 5)} {items?.seller?.slice(37, 42)}
                </div>
                <div className='third'>
                  {ethers.utils.formatEther(items?.amount)}
                </div>
                <div className='fourth'>{Number(items.token_id)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BuyHistory;
