import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import Bookmarks from "../Children/Bookmarks";
import SignerChildren from "../Children/SignerChildren";
import BuySearchChildren from "../Children/BuySearch";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <SignerChildren>
      <Bookmarks>
        <BuySearchChildren>
          <App />
        </BuySearchChildren>
      </Bookmarks>
    </SignerChildren>
  </HashRouter>
);
