import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../cartSlice";
import toast from "react-hot-toast";
import "../css/Product.css";

const staticProducts = [
    {
        _id: "1",
        name: "Organic Fertilizer",
        brand: "AgroGrow",
        price: 350,
        description: "High-quality organic fertilizer for healthy crops.",
        ratings: 4.5,
        imageUrl: "https://www.kelenytopsoil.com/wp-content/uploads/2022/08/shutterstock_669343642.jpg "
    },
    {
        _id: "2",
        name: "Hybrid Seeds Pack",
        brand: "SeedPro",
        price: 120,
        description: "Top-grade hybrid seeds with high yield potential.",
        ratings: 4.2,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/4/300382921/WQ/MR/AZ/114147768/f1-hybrid-tomato-seeds-1000x1000.jpg"
    },
    {
        _id: "3",
        name: "Drip Irrigation Kit",
        brand: "WaterFlow",
        price: 799,
        description: "Complete kit for efficient water use in farming.",
        ratings: 4.8,
        imageUrl: "https://th.bing.com/th/id/OIP.dw0EWwNgBtECGGhL2NfcOQHaHa?cb=iwp2&w=1000&h=1000&rs=1&pid=ImgDetMain"
    },
       {
        _id: "1",
        name: "Organic Fertilizer",
        brand: "AgroGrow",
        price: 350,
        description: "High-quality organic fertilizer for healthy crops.",
        ratings: 4.5,
        imageUrl: "https://www.kelenytopsoil.com/wp-content/uploads/2022/08/shutterstock_669343642.jpg "
    },
    {
        _id: "2",
        name: "Hybrid Seeds Pack",
        brand: "SeedPro",
        price: 120,
        description: "Top-grade hybrid seeds with high yield potential.",
        ratings: 4.2,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/4/300382921/WQ/MR/AZ/114147768/f1-hybrid-tomato-seeds-1000x1000.jpg"
    },
    {
        _id: "3",
        name: "Drip Irrigation Kit",
        brand: "WaterFlow",
        price: 799,
        description: "Complete kit for efficient water use in farming.",
        ratings: 4.8,
        imageUrl: "https://th.bing.com/th/id/OIP.dw0EWwNgBtECGGhL2NfcOQHaHa?cb=iwp2&w=1000&h=1000&rs=1&pid=ImgDetMain"
    }
];

const ProductCard = () => {
    const [products] = useState(staticProducts);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.mycart?.cart || []);

    const handleAddToCart = (product) => {
        
        dispatch(addtoCart(product));
        
    };

    return (
        <div className="product-container">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                    
                    <div className="product-content">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-brand">{product.brand}</p>
                        <p className="product-description">{product.description}</p>
                        <div className="product-details">
                            <div className="product-rating">
                                <span className="star">★</span> {product.ratings}
                            </div>
                            <div className="product-price">₹{product.price}</div>
                        </div>
                        <button 
                            className="product-button"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;
