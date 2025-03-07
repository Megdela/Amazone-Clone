import { Type } from "./action.type";

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        // If item doesn't exist, add it with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If item exists, update the amount by incrementing it
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Increment the amount of the existing item
            : item
        );

        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // Decrease the amount of the item by 1
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};
