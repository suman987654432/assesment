const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  items: [
    {
      productId: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: true,
        default: "Product" 
      },
      price: {
        type: Number,
        required: true,
        default: 0
      },
      qnty: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  paymentInfo: {
    paymentId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'inr'
    },
    status: {
      type: String,
      default: 'completed'
    }
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
