import React, { useContext } from "react";
import Buttons from "../../Children/button";
import { ethers } from "ethers";
import { SignerApi } from "../../ContextApi/signerApi";
import { toast } from "react-toastify";
import "./styles/SubscriptionManual.css";
import useSubscription from "../../hooks/useSubscription";
interface ChangeEvent {
  target: {
    value: string;
  };
}

function SubscriptionManual({
  setLoader,
}: {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [input, setInput] = React.useState("");
  const [ether, setEther] = React.useState("0");

  const handleChange = (e: ChangeEvent) => {
    setTimeout(() => {
      setInput(e.target.value);
    }, 1000);
  };

  const subscribe = useSubscription();

  React.useEffect(() => {
    try {
      let inputNumber = Number(input);
      let seconds = inputNumber * 60 * 24 * 60;
      let wei = (100000000000 / 3) * seconds;
      let finalEther = ethers.utils.formatEther(wei.toString());
      setEther(finalEther);
    } catch (error) {
      console.log(error);
    }
  }, [input]);

  const value = useContext(SignerApi);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(() => true);
      await subscribe(ether);
      toast.success("Successfully Subscribed");
      setLoader(() => false);
      e.currentTarget.reset();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
  };

  return (
    <div className="Manual_Container">
      <div className="ManualTopic">
        You can manually select the number of days you want to subscribe for.
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            onChange={handleChange}
            placeholder="Duration of subscription(days) "
            required
          />
          <button type="submit">
            <Buttons>Subscribe</Buttons>
          </button>
        </form>
        <div style={{ textAlign: "center" }}>
          The total cost for the selected number of days will be shown here.
          {ether}Eth
        </div>
      </div>
    </div>
  );
}

export default SubscriptionManual;
