const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }
  
  if (adminModel.validateAdmin(email, password)) {
    // Create token
    const token = jwt.sign(
      { id: 'admin', email },
      process.env.JWT_SECRET || 'adminTokenSecret',
      { expiresIn: '1h' }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
};

module.exports = {
  adminLogin
};
