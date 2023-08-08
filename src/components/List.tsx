import ListItem from "./ListItem";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { useRef, useEffect } from 'react';
import { clearAll } from "../features/products";
import { toggle } from "../features/modal";

function List() {

  const { products: { selectedProducts } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const clearAllButtonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {

    if (!clearAllButtonRef.current?.getAttribute('disabled')) {
      clearAllButtonRef.current?.setAttribute('disabled', '')
    }

    if (selectedProducts.length >= 1) {
      clearAllButtonRef.current?.removeAttribute('disabled');
    }

  }, [selectedProducts])

  const handleDelete = () => {
    dispatch(clearAll());
  }

  return (
    <section className="p-4 w-[50%] relative max-h-screen flex flex-col gap-1">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">List</h1>
        <button className="disabled:bg-red-100 disabled:cursor-not-allowed lowercase bg-red-200 hover:bg-red-300 px-3.5 py-1 rounded-md" ref={clearAllButtonRef} onClick={handleDelete}>Clear All</button>
      </div>
      <div className="flex flex-col gap-2 overflow-auto w-full ">
        {
          selectedProducts.map((item, index: number) => <ListItem name={item.name} id={item.id} image={item.image} price={item.price} key={index} quantity={item.quantity} />)
        }
      </div>
      <div className="mt-auto  p-4 bg-[#ebebeb] w-auto -m-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Total: ${selectedProducts.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0).toFixed(2)}</h1>
          <p>Quantity: {selectedProducts.reduce((acc, product) => acc + product.quantity, 0)}</p>
        </div>
        <div>
          <button className="bg-green-300 hover:bg-green-300/70 px-3 py-1 rounded-md mr-10" onClick={() => dispatch(toggle())}>Checkout</button>
        </div>
      </div>
    </section>
  )
}

export default List;