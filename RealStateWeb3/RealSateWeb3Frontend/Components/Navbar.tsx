import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";
import { SignerApi } from "../ContextApi/signerApi";
import Buttons from "../Children/button";
import { CustomWindow } from "../Children/SignerChildren";
interface Permission {
  parentCapability: string;
  // add other properties here if necessary
}
export default function Navbar() {
  const value = useContext(SignerApi);

  const [res, setRes] = React.useState(false);

  const connectMetaMask = async () => {
    if ((window as CustomWindow).ethereum) {
      const res = await (window as CustomWindow).ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accountsPermission = await res.find(
        (permission: Permission) =>
          permission.parentCapability === "eth_accounts"
      );

      if (accountsPermission) {
        console.log("eth_accounts permission successfully requested!");
      }

      value?.fetchSigner();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <section className="main_Nav">
        <nav className="Nabvar_Container">
          <div className="navbar_Left">
            <div
              className="logo"
              onClick={() => {
                navigate("/"), setRes(true);
              }}
            >
              <span className="logo_Big">Realty </span>
              <span className="logo_Small">Zone</span>
            </div>
            <div
              className={
                res ? "linkContainer" : "linkContainer reslinkContainer"
              }
              onClick={() => setRes(true)}
            >
              <div>
                <NavLink to="/buy" className="link">
                  Buy
                </NavLink>
              </div>
              <div>
                <NavLink to="/sell" className="link">
                  Sell
                </NavLink>
              </div>
              <div>
                <NavLink to="/history" className="link">
                  History
                </NavLink>
              </div>
              <div>
                <NavLink to="/subscription" className="link">
                  Subscription
                </NavLink>
              </div>
              <div>
                <NavLink to="/yourproperty" className="link">
                  <span>Your</span>
                  <span>Nft's</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div
            className={
              res ? "bookMarksConnect" : "bookMarksConnect resbookMarksConnect"
            }
            onClick={() => setRes(true)}
          >
            <div>
              <NavLink to="/bookmarks" className="link">
                Bookmarks
              </NavLink>
            </div>
            {!value?.signers?._address ? (
              <button onClick={() => connectMetaMask()}>
                <Buttons>Connect</Buttons>
              </button>
            ) : (
              <button>
                <Buttons>
                  {`${value?.signers?._address.slice(
                    0,
                    5
                  )}...${value?.signers?._address.slice(37, 42)}`}
                </Buttons>
              </button>
            )}
          </div>
        </nav>
        <div className="ham" onClick={() => setRes((x) => !x)}>
          {res ? (
            <i className="fa-solid fa-bars fa-2x"></i>
          ) : (
            <i className="fa-solid fa-xmark fa-2x"></i>
          )}
        </div>
      </section>
      <div style={{ height: "65px" }}></div>
    </>
  );
}
