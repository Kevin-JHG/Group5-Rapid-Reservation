import { create } from 'zustand';

const useReservationStore = create(set => ({
  orderType: 'reservation',
  reservation: {
    date: null,
    time: null,
    partySize: null,
  },
  cart: [],
  setOrderType: type => set(state => ({ ...state, orderType: type })),
  // set reservation object using a partial reservation object (E.g. { partySize: 5 })
  setReservation: reservationObj =>
    set(state => ({ ...state, reservation: { ...state.reservation, ...reservationObj } })),
  // add a cart item
  addCartItem: id => set(state => ({ ...state, cart: [...state.cart, { id, quantity: 1 }] })),
  // increment quantity
  incrementQuantity: id =>
    set(state => ({
      ...state,
      cart: state.cart.map(itm => (itm.id === id ? { ...itm, quantity: itm.quantity + 1 } : itm)),
    })),
  // decrement quantity
  decrementQuantity: id =>
    set(state => {
      // remove item in cart before quantity hits 0
      const item = state.cart.find(itm => itm.id === id);
      if (item.quantity === 1) {
        return { ...state, cart: state.cart.filter(itm => itm.id !== id) };
      }

      return {
        ...state,
        cart: state.cart.map(itm => (itm.id === id ? { ...itm, quantity: itm.quantity - 1 } : itm)),
      };
    }),
  // update cart with new quantities
  updateCart: newQuantities =>
    set(state => {
      const updatedCart = state.cart.map(item => ({
        ...item,
        quantity: newQuantities[item.id] || 0,
      })).filter(item => item.quantity > 0);

      return { ...state, cart: updatedCart };
    }),
}));

export default useReservationStore;
