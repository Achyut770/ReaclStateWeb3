import React, { useContext } from "react";
import "../Styles/sell.css";
import fileToIpfs, { JsonToPinata } from "../Utils/fileToIpfs";
import Buttons from "../Children/button";
import Loader, { PopUp } from "../Components/Loader";

import useSellProperty from "../hooks/SellProperty";
import { toast } from "react-toastify";
import { SignerApi } from "../ContextApi/signerApi";
interface WithImage extends HTMLTextAreaElement {
  files?: File;
}
function Sell() {
  const [input, setInput] = React.useState<any>({});
  const [amount, setAmount] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [popUp, setPopUp] = React.useState(false);
  const [event, setEvent] =
    React.useState<null | React.FormEvent<HTMLFormElement>>(null);
  const value = useContext(SignerApi);

  const [hash, setHash] = React.useState("");
  const { sellToAuction } = useSellProperty();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | WithImage>) => {
    const { name, value, files } = e.target;
    setInput((x: any) => {
      return { ...x, [name]: name == "image" ? files : value };
    });
  };

  const JsonFileToIpfs = async () => {
    if (!loader) return;
    try {
      const jsonHash = await JsonToPinata(JSON.stringify(input));
      console.log(jsonHash);
      await sellToAuction(jsonHash, amount);
      setHash(() => jsonHash);
      setLoader(() => false);
      setPopUp(() => true);
      toast.success("Successfully added the property");
      value?.fetchSignerAndDate();
      event?.currentTarget?.reset();
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
  };

  React.useEffect(() => {
    JsonFileToIpfs();
  }, [input.image]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEvent(() => e);
    setLoader(() => true);

    try {
      const arrayImage = await fileToIpfs(input.image);
      setInput((x: any) => {
        return { ...x, image: [...arrayImage] };
      });
    } catch (err) {
      setLoader(() => false);
      toast.error("Something Went wrong");
    }
  };

  return (
    <>
      {popUp && <PopUp hash={hash} setClose={() => setPopUp(() => false)} />}
      {loader && (
        <div>
          <Loader />
        </div>
      )}

      <div className="sell_Topic">Sell Your Property</div>
      {/* <img src={image} /> */}
      <form onSubmit={handleSubmit} className="form">
        <div className="input_Container">
          <div>
            <label>
              <div onClick={() => console.log(input)}>Country</div>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={input.country}
                required
                placeholder="Eg.Nepal"
              />
            </label>
          </div>
          <div>
            <label>
              <div>City</div>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={input.city}
                required
                placeholder="Eg.KAthmandu"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Property Type</div>
              <input
                type="text"
                name="type"
                onChange={handleChange}
                value={input.type}
                required
                placeholder="Eg.Home,Appartment,Land etc"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Amount</div>
              <input
                type="number"
                onChange={(e) => setAmount(() => e.target.value)}
                value={amount}
                required
                placeholder="Eg. 1(Eth)"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Area</div>
              <input
                type="text"
                name="area"
                onChange={handleChange}
                value={input.area}
                required
                placeholder="Eg.20 sq ft"
              />
            </label>
          </div>
          <div>
            <label className="Radio_Buttons_Container">
              <div>Swimming Pool:</div>
              <div className="actual_RadioButoons">
                <input
                  type="radio"
                  id="Yes"
                  name="swimming_Pool"
                  checked={input.swimming_Pool === "Yes"}
                  onChange={handleChange}
                  value="Yes"
                />
                <label htmlFor="Yes">Yes</label>
                <input
                  type="radio"
                  id="No"
                  name="swimming_Pool"
                  checked={input.swimming_Pool === "No"}
                  onChange={handleChange}
                  value="No"
                />
                <label htmlFor="No">No</label>
              </div>
            </label>
          </div>
          <div>
            <label>
              <div>Bathroom</div>
              <input
                type="number"
                name="bathroom"
                onChange={handleChange}
                value={input.bathroom}
                required
                placeholder="Eg.1"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Bedroom</div>
              <input
                type="number"
                name="bedroom"
                onChange={handleChange}
                value={input.bedroom}
                required
                placeholder="Eg.1"
              />
            </label>
          </div>
          <div>
            <label>
              <div>Parking</div>
              <input
                type="number"
                name="parking"
                onChange={handleChange}
                value={input.parking}
                required
                placeholder="Eg.1"
              />
            </label>
          </div>

          <div>
            <label>
              <div>Floor</div>
              <input
                type="number"
                name="floor"
                onChange={handleChange}
                value={input.floor}
                required
                placeholder="Eg.1"
              />
            </label>
          </div>
          <div className="uploadImage">
            <label>
              <div>Upload House Images</div>
              <div className="iconUpload">
                <div>
                  <i className="fa-solid fa-upload fa-2x"></i>
                </div>
              </div>
              <input
                id="input_File"
                className="image_Input"
                onChange={handleChange}
                type="file"
                name="image"
                multiple
              />
            </label>
          </div>
          <div>
            <label>
              <div>Description</div>
              <textarea
                name="description"
                onChange={handleChange}
                value={input.description}
                required
                placeholder="Write Short description about your Property"
              />
            </label>
          </div>
        </div>
        <button type="submit">
          <Buttons>Submit</Buttons>
        </button>
      </form>
    </>
  );
}

export default Sell;
