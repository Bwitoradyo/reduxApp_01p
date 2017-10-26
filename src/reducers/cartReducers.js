"use strict";

export const cartReducers = (state={cart:[]}, action) => {
  switch(action.type){
    case "UPDATE_CART":
      //Create a copy of the current array of books
      const currentBookToUpdate = [...state.cart]
      //Determine at which index in books array is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex((book)=>{
        return book._id === action._id
      });
      const newBookToUpdate = {...currentBookToUpdate[indexToUpdate],
      quantity:currentBookToUpdate[indexToUpdate].quantity + action.unit}

      let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,  ...currentBookToUpdate.slice(indexToUpdate + 1)]
      
      return {
        ...state, 
	cart:cartUpdate,
        totalAmount: totals(cartUpdate).amount,
	totalQty: totals(cartUpdate).qty
      }
      break;


    case "ADD_TO_CART":
      return {
        ...state, 
	cart:action.payload, 
	totalAmount: totals(action.payload).amount,
	totalQty: totals(action.payload).qty
      }
      break;

    case "DELETE_CART_ITEM":
      return {
        ...state,
	cart:action.payload,
        totalAmount: totals(action.payload).amount,
	totalQty: totals(action.payload).qty
      }
      break;
  }
  return state;
};

//CALCULATE TOTALS
export const totals = (payloadArr) => {

  const totalAmount = payloadArr.map((cartArr) => {
    return cartArr.price * cartArr.quantity
  }).reduce((a, b) => {
    return a + b;
  }, 0) //start summing from index0


  const totalQty = payloadArr.map((qty) => {
    return qty.quantity;
  }).reduce((a, b) => {
    return a + b;
  }, 0)


  return {amount:totalAmount.toFixed(2), qty: totalQty}
};
