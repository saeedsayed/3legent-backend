export default (cartProducts) => {
  return cartProducts.reduce(
    (acc, p) => acc + p.quantity * (p.product.price - p.product.discount),
    0
  );
};