/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products: any[]) => {
  let sum = 0
  products.forEach(product => sum += product.price)
  return sum
}
