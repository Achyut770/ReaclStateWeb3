const SellingProperty = require("./Functions/sellingProperty/SellingProperty");
const Subscription = require("./Functions/Subscription/Subscription");
const SubscriptionCuurentTimeLess = require("./Functions/Subscription/SubscriptionCuurentTimeLess");
const SellingPropertyWithId = require("./Functions/sellingProperty/SellPropertyWithId");
const BuyAndCancelling = require("./Functions/BuyAndCancelling");

describe("Token Swap smart contract", () => {
  describe("When currentTime is greater then the the previously  Subscription", () =>
    Subscription());
  describe("When currentTime is less then the the previously Subscribed Time ", () =>
    SubscriptionCuurentTimeLess());
  describe("For Sell Property", () => SellingProperty());
  describe("Selling property With Id", () => SellingPropertyWithId());
  describe("For cancelling and  For Buy Property", () => BuyAndCancelling());
});
