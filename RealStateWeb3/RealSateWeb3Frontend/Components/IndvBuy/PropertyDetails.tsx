import React, { useContext } from "react";
import { data } from "../Card/Cards";
import "./styles/PropertyDetails.css";
import { BookmarksApi } from "../../ContextApi/Bookmarks";
import useBuyProperty from "../../hooks/BuyProperty";
import Loader from "../Loader";
import { SignerApi } from "../../ContextApi/signerApi";
import useCancelProperty from "../../hooks/removeProperty";
import Buttons from "../../Children/button";
import useAddProperty from "../../hooks/AddToproperty";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface PropertyProp {
  items: data | undefined;
  fromIndvProperty?: boolean;
  setClose?: () => void;
  setLoader?: React.Dispatch<React.SetStateAction<boolean>>;
  loader?: boolean;
}
function PropertyDetails({
  items,
  fromIndvProperty,
  setClose,
  setLoader,
  loader,
}: PropertyProp) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  // For scrolling Image
  const [num, setNum] = React.useState(0);
  // For loading while buying or removing property
  const [input, setInput] = React.useState("");
  //Hooks
  const { BuyProperty } = useBuyProperty();
  const { CancelProperty } = useCancelProperty();
  const { sellPropertyById } = useAddProperty();

  // Signers.....
  const value = useContext(BookmarksApi);
  const signerValue = useContext(SignerApi);

  // Adding or removing bookmarks....
  const addRemoveBookmarks = (bool: boolean) => {
    let bookmarks = localStorage.getItem("Bookmark");
    if (!bookmarks || !items?.Token_Id) return;
    let data = JSON.parse(bookmarks);
    data = { ...data, [items?.Token_Id]: bool };
    localStorage.setItem("Bookmark", JSON.stringify(data));
    value?.fetchBookmarks();
  };

  // Buying property.....
  const buyOrRemovingProperty = async (isOwner: boolean) => {
    try {
      setLoading(() => true);
      isOwner
        ? await CancelProperty(items?.Token_Id)
        : await BuyProperty(items?.Token_Id, items?.amount);
      setLoading(() => false);
      isOwner ? navigate("/buy") : navigate("/yourproperty");
      signerValue?.fetchSignerAndDate();
      toast.success("SuccessFull");
    } catch (error) {
      console.log(error);
      setLoading(() => false);
      toast.error("Something Went Wrong");
    }
  };

  const sellTheproperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoader && setLoader(() => true);

      await sellPropertyById(items?.Token_Id, input);
      signerValue?.fetchSignerAndDate();
      setClose?.();
      navigate("/yourproperty");
      setLoader && setLoader(() => false);
      toast.success("SuccessFully added the property");
    } catch (error) {
      setLoader && setLoader(() => false);
      toast.error("Something Went Wrong");
    }
  };

  if (!items) {
    return <div>Loading.. .</div>;
  }
  // To konow if the connector is owner of the property or not...
  let isOwner = signerValue?.signers?._address === items.owner;

  return (
    <>
      {loading && <Loader />}
      <div className="propertyDetailsMainContainer">
        <div className="Property_Details_Photo_Container">
          <div className="propery_Photo_Container">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${items.image[num]}`}
              className="Property_Photo"
              alt="asd"
            />
          </div>
          <button
            className="prev"
            onClick={() =>
              num == 0 ? setNum(items.image.length - 1) : setNum((x) => x - 1)
            }
          >
            <i className="fa-solid fa-circle-arrow-left fa-2x arrow_icon"></i>
          </button>
          <button
            className="next"
            onClick={() =>
              num == items.image.length - 1 ? setNum(0) : setNum((x) => x + 1)
            }
          >
            <i className="fa-solid fa-circle-arrow-right fa-2x arrow_icon "></i>
          </button>
          {!fromIndvProperty && (
            <div className="bookmarks">
              {value?.bookmarksData[items?.Token_Id] ? (
                <div onClick={() => addRemoveBookmarks(false)}>Y</div>
              ) : (
                <div onClick={() => addRemoveBookmarks(true)}>N</div>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="propertyDetailsBottom">
            <div className="propertyDetailsTop">
              <div>{items.type}</div>
              <div>
                <i className="fa-solid fa-location-dot"></i>&nbsp;
                {items.country},{items.city}
              </div>
              <div>
                {items.amount / 10 ** 18}&nbsp;
                <i className="fa-brands fa-ethereum"></i>
              </div>
            </div>

            <div>
              <div className="BBFP">
                <div>
                  Bathroom:&nbsp;<i className="fa-solid fa-sink"></i>
                  {items.bathroom}
                </div>
                <div>
                  Bedroom:&nbsp;<i className="fa-solid fa-bed"></i>
                  {items.bedroom}
                </div>
                <div>
                  Floor:&nbsp;<i className="fa-solid fa-house"></i>
                  {items.floor}
                </div>
                <div>
                  Parking:&nbsp;<i className="fa-solid fa-car"></i>
                  {items.parking}
                </div>
                <div>
                  Swimming Pool:&nbsp;
                  <i className="fa-solid fa-person-swimming"></i>
                  {!items.pool ? "No" : "Yes"}
                </div>
              </div>
            </div>
            <div>
              <div className="description">
                <b>Description</b>:
              </div>
              <div>{items.description}</div>
            </div>
            {fromIndvProperty && (
              <form onSubmit={sellTheproperty} className="detailsForm">
                <input
                  type="number"
                  onChange={(e) => setInput(() => e.target.value)}
                  value={input}
                  required
                  placeholder="New Amount in ethers"
                />
                <button type="submit">
                  <Buttons>Add To sell</Buttons>
                </button>
              </form>
            )}
            {!fromIndvProperty && (
              <button onClick={() => buyOrRemovingProperty(isOwner)}>
                {isOwner ? (
                  <Buttons>Cancel selling property</Buttons>
                ) : (
                  <Buttons>Buy the property</Buttons>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
