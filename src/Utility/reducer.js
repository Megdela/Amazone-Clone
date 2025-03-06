import { Type } from "./action.type";

export const initialState = {
    basket: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            // Check if the item already exists in the basket
            const existingItem = state.basket.find((item) => item.id === action.item.id);
            
            if (!existingItem) {
                // If item doesn't exist, add it with amount 1
                return {
                    ...state, 
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                // If item exists, update the amount by incrementing it
                const updatedBasket = state.basket.map((item) => 
                    item.id === action.item.id
                        ? { ...item, amount: item.amount + 1 }  // Increment the amount of the existing item
                        : item
                );

                return {
                    ...state, 
                    basket: updatedBasket
                };
            }

        default:
            return state;
    }
};
