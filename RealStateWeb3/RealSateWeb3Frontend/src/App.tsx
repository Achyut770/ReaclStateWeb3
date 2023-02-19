import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Buy from "../Pages/Buy";
import Sell from "../Pages/Sell";
import History from "../Pages/History";
import React from "react";
import Navbar from "../Components/Navbar";
import IndvBuy from "../Pages/IndvBuy";
import Subscription from "../Pages/Subscription";
import Footer from "../Components/Footer";
import Bookmarks from "../Pages/Bookmarks";
import Top from "../Children/Top";
import YourProperty from "../Pages/yourProperty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Top>
              <Home />
            </Top>
          }
        />
        <Route
          exact
          path="/buy"
          element={
            <Top>
              <Buy />
            </Top>
          }
        />
        <Route
          path="/buy/:token_ID"
          element={
            <Top>
              <IndvBuy />
            </Top>
          }
        />
        <Route
          path="/sell"
          element={
            <Top>
              <Sell />
            </Top>
          }
        />
        <Route
          path="/subscription"
          element={
            <Top>
              <Subscription />
            </Top>
          }
        />
        <Route
          path="/history"
          element={
            <Top>
              <History />
            </Top>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <Top>
              <Bookmarks />
            </Top>
          }
        />
        <Route
          path="/yourproperty"
          element={
            <Top>
              <YourProperty />
            </Top>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer
        z-index={4567}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
