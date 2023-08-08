import { ItemPropsType } from "../types";

function Item({ name, image, price, onClick }: ItemPropsType) {

  return (
    <div className="flex bg-white rounded-lg p-2 cursor-pointer hover:opacity-60" onClick={onClick}>
      <div className="w-20 flex items-center justify-center">
        <img src={image} alt={name} className="h-20" />
      </div>
      <div className="p-4">
        <p className="font-bold">{name}</p>
        <p className="text-sm">Price: <span className="font-bold">${price}</span></p>
      </div>
    </div>
  )
}

export default Item;