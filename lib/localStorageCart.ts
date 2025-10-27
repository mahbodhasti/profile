export function getCart() {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: any[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item: any) {
  const cart = getCart();
  const existing = cart.find((p: any) => p.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item: any) => item.id !== id);
  saveCart(cart);
  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new CustomEvent("cartUpdated"));
}
