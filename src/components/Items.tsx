import { ItemPropsType } from "../types";
import Item from "./Item";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { selectProduct } from "../features/products";

function areEqual(name: string, term: string) {
  const searchTermLetters = term.toLowerCase().split('');
  const productNameLetters = name.toLowerCase().split('');

  // Check if all the letters in searchTermLetters are present in productNameLetters
  const hasAllLetters = searchTermLetters.every((letter) => productNameLetters.includes(letter));

  return hasAllLetters;
}

function Items() {

  const { products: { itemsData }, search: { term } } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();


  const filteredProducts = itemsData.filter((item) =>
    areEqual(item.name, term)
  );

  const handleClick = (id: string) => {
    const selectedItem = itemsData.find(item => item.id === id);

    dispatch(selectProduct(selectedItem));
  };

  return (
    <div className="bg-[#ebebeb] w-[50%] h-[100vh]">
      <section className="flex flex-col justify-between p-4 h-full">
        <div className="grid grid-cols-3 gap-4">
          {
            filteredProducts.map((data: ItemPropsType, index: number) => (
              <Item name={data.name} price={data.price} image={data.image} code={data.code} key={index} onClick={() => handleClick(data.id)} id={data.id} quantity={data.quantity} />
            ))
          }
        </div>
        <SearchBar />
      </section>
    </div>
  )
}

export default Items;