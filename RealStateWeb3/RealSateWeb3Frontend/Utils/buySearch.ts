import { data } from "../Components/Card/Cards";

const buySearch = (datas: data[] | undefined, value: string) => {
  let array: data[] = [];
  datas?.map((items, index) => {
    console.log(items.Token_Id);
    if (
      items.Token_Id === value ||
      items.type.toLowerCase() === value.toLowerCase() ||
      items.country.toLowerCase() === value.toLowerCase()
    ) {
      array.push(items);
    }
  });

  return array;
};

export default buySearch;
