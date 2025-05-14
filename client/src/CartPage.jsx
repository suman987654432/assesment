import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { qntyInc, qntyDec, proDelete } from "./cartSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./css/cart.css";

const CartPage = () => {
  const Cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totAmount = 0;

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🛒 My Cart</h1>
      <hr />
      {Cart.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover className="cart-table">
            <thead>
              <tr>
                <th className="cart-th">Image</th>
                <th className="cart-th">Product Name</th>
                <th className="cart-th">Description</th>
                <th className="cart-th">Price</th>
                <th className="cart-th">Quantity</th>
                <th className="cart-th">Total</th>
                <th className="cart-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {Cart.map((product) => {
                totAmount += product.price * product.qnty;
                return (
                  <tr key={product._id} className="cart-tr">
                    <td className="cart-td">
                      <img src={product.imageUrl} alt={product.name} className="cart-image" />
                    </td>
                    <td className="cart-td">{product.name}</td>
                    <td className="cart-td">{product.description}</td>
                    <td className="cart-td">₹{product.price}</td>
                    <td className="cart-td">
                      <FaMinusCircle
                        className="cart-icon"
                        onClick={() => dispatch(qntyDec({ _id: product._id }))}
                      />
                      <span className="cart-quantity">{product.qnty}</span>
                      <FaPlusCircle
                        className="cart-icon"
                        onClick={() => dispatch(qntyInc({ _id: product._id }))}
                      />
                    </td>
                    <td className="cart-td">₹{product.price * product.qnty}</td>
                    <td className="cart-td">
                      <MdDelete
                        className="cart-delete-icon"
                        onClick={() => dispatch(proDelete(product._id))}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="cart-footer">
            <h3 className="cart-total-amount">
              <PiCurrencyInrBold /> {totAmount}
            </h3>
            <Button variant="warning" className="cart-checkout-button" onClick={() => navigate("/payment")}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;