import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
    name: "mycart",
    initialState: {
        cart: []
    },
    reducers: {
        addtoCart: (state, actions) => {
            const data = state.cart.filter(key => key._id == actions.payload._id)
            if (data.length >= 1) {
                toast.error("Product already added!!!");
            }
            else {
                state.cart.push({...actions.payload, qnty: 1});
                toast.success(`${actions.payload.name} added to cart!`);
            }
        },

        qntyInc: (state, actions) => {
            for (var i = 0; i < state.cart.length; i++) {
                if (state.cart[i]._id == actions.payload._id) {
                    state.cart[i].qnty++;
                }
            }
        },
        qntyDec: (state, actions) => {
            for (var i = 0; i < state.cart.length; i++) {
                if (state.cart[i]._id == actions.payload._id) {
                    if (state.cart[i].qnty <= 1) {
                        toast.error("Quantity not less than 1")
                    }
                    else {
                        state.cart[i].qnty--;
                    }
                }
            }
        },
     
        proDelete: (state, actions) => {
            state.cart = state.cart.filter(key => key._id != actions.payload)
        }
    }
});

export const { 
    addtoCart, 
    qntyInc, 
    qntyDec, 
    proDelete 
} = cartSlice.actions;

export default cartSlice.reducer;