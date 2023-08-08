export type ItemPropsType = {
  name: string,
  image: string,
  price: number,
  code?: string,
  onClick?: () => void,
  id: string,
  quantity: number
}