import { ItemPropsType } from "../types";
import minus from '../assets/minus.png';
import plus from '../assets/plus.png';
import { useDispatch } from 'react-redux';
import { decrement, increment, deleteProduct } from "../features/products";

function ListItem({ name, price, image, quantity, id }: ItemPropsType) {

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between rounded-lg p-2 border-b-2 border-[#f3f3f3]">
      <div className="flex">
        <div className="w-20 flex items-center justify-center" >
          <img src={image} alt={name} className="h-20" />
        </div>
        <div className="p-4">
          <p className="font-bold">{name}</p>
          <p className="text-sm">Price: <span className="font-bold">${price}</span></p>
        </div>
      </div>

      {/* Counter */}
      <div className="flex flex-col  gap-1">
        <div className="flex gap-1.5 items-center">
          <img src={minus} alt="Minus" className="w-6 h-6 cursor-pointer" onClick={() => dispatch(decrement(id))} />
          <span className="text-lg">{quantity}</span>
          <img src={plus} alt="Plus" className="w-6 h-6 cursor-pointer" onClick={() => dispatch(increment(id))} />
        </div>
        <button className="bg-red-200 hover:bg-red-300 px-3.5 py-1 rounded-md" onClick={() => dispatch(deleteProduct(id))}>Delete</button>
      </div>
    </div >
  )
}

export default ListItem;