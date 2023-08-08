import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/modal";
import { RootState } from "../store/store";
import { useMemo, useState, useRef } from "react";
import { clearAll } from "../features/products";

function Modal() {

  const [money, setMoney] = useState<number>(0);
  const [showChange, setShowChange] = useState<boolean>(false);

  const calculateButtonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const { products: { selectedProducts } } = useSelector((state: RootState) => state)

  const price = useMemo(() => selectedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0), [selectedProducts]);

  const change = useMemo(() => {
    return money - price;
  }, [price, money]);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowChange(true);
  }

  const calculate = () => {
    if (money == 0 || money < price) {
      return calculateButtonRef.current?.setAttribute('disabled', "");
    }
    return calculateButtonRef.current?.removeAttribute('disabled');
  }

  const completePrice = () => {
    setMoney(price);
  }

  const completeCheckout = () => {
    dispatch(toggle());
    dispatch(clearAll());
  }

  return (
    <div className='fixed z-50 left-0 top-0 w-full h-full bg-black/60 overflow-hidden flex flex-col justify-center items-center'>
      <div className="bg-white p-2">
        <button onClick={() => dispatch(toggle())}>
          ❌
        </button>
        <form onSubmit={(e) => handleClick(e)} className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="font-bold text-lg">
              Total Price:
            </label>
            <input type="number" value={price.toFixed(2)} disabled name="price" id="price" className="bg-[#eaeaea] px-2.5 py-1 rounded" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="money" className="font-bold text-lg">Money Received: </label>
            <div className="flex">
              <input type="number" value={money.toFixed(2)} name="money" id="money" onChange={(e) => setMoney(Number(e.target.value))} className="bg-[#eaeaea] px-2.5 py-1 rounded" />
              <button className="p-2" type="button" onClick={completePrice}>✔️</button>
            </div>
          </div>
          <button className="disabled:bg-red-400 disabled:cursor-not-allowed bg-red-500 hover:bg-red-500/80 text-white py-1 rounded" onClick={calculate} ref={calculateButtonRef} type="submit">Calculate</button>

          {showChange && <span className="text-lg">Change:<span className="font-bold text-xl ml-2">${change.toFixed(2)}</span></span>}
          <button className="disabled:bg-green-400 disabled:cursor-not-allowed bg-green-500 hover:bg-green-500/80 text-white py-1 rounded" onClick={completeCheckout} ref={calculateButtonRef} type="submit">Complete Checkout</button>
        </form>
      </div>
    </div>
  )
}

export default Modal;