import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/showproduct.css';

const ShowProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          console.error('Unexpected API response format:', response.data);
          setOrders([]);
          setError('Received unexpected data format from server');
        }

        setLoading(false);
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to fetch orders: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = (orders) => {
    if (!Array.isArray(orders)) return [];
    
    return orders.filter(order => {
      const matchesSearch = !searchTerm || 
        (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(order.items) && order.items.some(item => 
          item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      if (currentFilter === 'all') return matchesSearch;
      // Add more filter conditions here if needed
      return matchesSearch;
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"></i>
          <div>{error}</div>
        </div>
        <Link to="/admin/dashboard" className="btn btn-primary">
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
      </div>
    );
  }

  const ordersList = Array.isArray(orders) ? orders : [];
  const filteredOrders = filterOrders(ordersList);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" style={{ minHeight: '100vh' }}>
          <div className="position-sticky pt-3">
            <div className="d-flex justify-content-center mb-4">
              <div className="text-center">
                <div className="bg-white rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-person-circle text-dark" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h5 className="text-white">Admin Panel</h5>
              </div>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link text-white hover-primary rounded-3 mb-2 px-3 py-3">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/orders" className="nav-link active bg-primary rounded-3 mb-2 px-3 py-3">
                  <i className="bi bi-cart-check me-2"></i>
                  Orders
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <button onClick={() => {
                  localStorage.removeItem('adminToken');
                  window.location.href = '/admin/login';
                }} className="nav-link text-white bg-danger rounded-3 mb-2 px-3 py-3 border-0 w-100 text-start">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">
              <i className="bi bi-cart-check text-primary me-2"></i>
              Order Management
            </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <Link to="/admin/dashboard" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
              </Link>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">{filteredOrders.length}</h3>
                  <p className="card-text">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">₹{filteredOrders.reduce((sum, order) => sum + (order.paymentInfo?.amount || order.totalAmount || 0), 0)}</h3>
                  <p className="card-text">Total Revenue</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h3 className="card-title">{filteredOrders.reduce((sum, order) => sum + (Array.isArray(order.items) ? order.items.length : 0), 0)}</h3>
                  <p className="card-text">Total Products Sold</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3 align-items-center">
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-search"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search by order ID, customer name or product..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <select 
                    className="form-select" 
                    value={currentFilter}
                    onChange={(e) => setCurrentFilter(e.target.value)}
                  >
                    <option value="all">All Orders</option>
                    <option value="recent">Recent Orders</option>
                    <option value="high-value">High Value Orders</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="card shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                <h4 className="mt-3 text-muted">No orders found</h4>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr className="table-light">
                      <th scope="col" className="border-0">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-hash me-2 text-primary"></i>
                          Order ID
                        </div>
                      </th>
                      <th scope="col" className="border-0">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person me-2 text-primary"></i>
                          Customer
                        </div>
                      </th>
                      <th scope="col" className="border-0">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-calendar-date me-2 text-primary"></i>
                          Date
                        </div>
                      </th>
                      <th scope="col" className="border-0">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-box-seam me-2 text-primary"></i>
                          Products
                        </div>
                      </th>
                      <th scope="col" className="border-0">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-currency-rupee me-2 text-primary"></i>
                          Total
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order._id || index}>
                        <td className="text-truncate" style={{ maxWidth: "150px" }}>
                          <span className="badge bg-light text-dark border px-2 py-1">
                            {order._id?.slice(0, 10) || 'N/A'}...
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '36px', height: '36px'}}>
                              <i className="bi bi-person text-primary"></i>
                            </div>
                            <div>
                              <div className="fw-medium">{order.user?.name || 'suman singh'}</div>
                              <div className="small text-muted">{order.user?.email || 'customer@example.com'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-calendar-date text-muted me-2"></i>
                            <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </td>
                        <td>
                          {Array.isArray(order.items) ? (
                            <div>
                              {order.items.slice(0, 2).map((item, index) => (
                                <div key={index} className="d-flex align-items-center mb-1">
                                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px'}}>
                                    <i className="bi bi-box-seam text-success small"></i>
                                  </div>
                                  <div className="small">
                                    <span className="fw-medium">{item.name}</span>
                                    <span className="ms-1">
                                      x {item.quantity || item.qnty}
                                    </span>
                                    <span className="ms-1 text-success">
                                      ₹{item.price}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <div className="small text-muted ms-4">
                                  +{order.items.length - 2} more items
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted">No items</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-success-subtle rounded-pill px-2 py-1 me-2">
                              <span className="text-success fw-medium">
                                ₹{order.paymentInfo?.amount || order.totalAmount || 0}
                              </span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" title="View Details">
                              <i className="bi bi-three-dots"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShowProduct;