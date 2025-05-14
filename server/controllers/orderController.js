const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, customerInfo, paymentId, amount } = req.body;
    
    console.log('Order creation request received:', {
      customerName: customerInfo?.name,
      customerEmail: customerInfo?.email,
      itemCount: items?.length || 0,
      paymentId,
      amount
    });

    // Validate required fields
    if (!items || !Array.isArray(items) || !customerInfo || !paymentId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information'
      });
    }

    // Validate and prepare each item to ensure they have all required fields
    const orderItems = items.map((item, index) => {
      if (!item.name) {
        console.warn(`Warning: Item at index ${index} is missing name property`);
      }
      if (!item.price && item.price !== 0) {
        console.warn(`Warning: Item at index ${index} is missing price property`);
      }
      if (!item.qnty && item.qnty !== 0) {
        console.warn(`Warning: Item at index ${index} is missing qnty property`);
      }
      
      return {
        productId: item._id ? String(item._id) : undefined,
        name: item.name || `Product ${index + 1}`, // Provide a default name
        price: item.price || 0, // Default price to 0
        qnty: item.qnty || 1 // Default quantity to 1
      };
    });

    // Create new order
    const newOrder = new Order({
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        address: customerInfo.address
      },
      items: orderItems,
      paymentInfo: {
        paymentId,
        amount
      }
    });

    // Save to database
    const savedOrder = await newOrder.save();
    console.log('Order saved successfully with ID:', savedOrder._id);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Order creation error:', error);
    
    // Detailed error logging
    if (error.name === 'ValidationError') {
      console.error('Validation error details:', error.errors);
      
      const validationErrors = Object.keys(error.errors).map(key => {
        return {
          field: key,
          message: error.errors[key].message,
          value: error.errors[key].value
        };
      });
      
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ 'paymentInfo.date': -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
