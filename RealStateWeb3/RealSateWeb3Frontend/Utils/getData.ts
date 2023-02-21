import { data } from "../Components/Card/Cards";
import {
  ERC721TokenHandlerinstance,
  ERC721Tokeninstance,
} from "./ContractsInstance";

const wholeData = async (i: number, array: data[]) => {
  const arrayOfToken = await ERC721Tokeninstance.tokenURI(i);

  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${arrayOfToken}`);
  let data = await res.text();
  let lastData = JSON.parse(data);
  let details = await ERC721TokenHandlerinstance.getsellerDetails(i);
  lastData = {
    ...lastData,
    Token_Id: i,
    amount: Number(details.amount),
    owner: details.seller,
  };
  array.push(lastData);
};

export const getData = async (address: string) => {
  const length = await ERC721Tokeninstance.totalSupply();
  console.log(Number(length));

  let array: data[] = [];
  let indvArray: data[] = [];

  for (let i = 1; i <= length; i++) {
    try {
      const data = await ERC721Tokeninstance.ownerOf(i);
      if (
        data.toUpperCase() === ERC721TokenHandlerinstance.address.toUpperCase()
      ) {
        await wholeData(i, array);

        continue;
      }
      if (address) {
        if (data.toUpperCase() === address.toUpperCase()) {
          await wholeData(i, indvArray);
        }
      }
    } catch (err) {
      console.log(err);
      continue;
    }
  }

  return { array, indvArray };
};
