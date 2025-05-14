import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

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
                <Link to="/admin-login" className="nav-link active bg-primary rounded-3 mb-2 px-3 py-3">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/orders" className="nav-link text-white hover-primary rounded-3 mb-2 px-3 py-3">
                  <i className="bi bi-cart-check me-2"></i>
                  Orders
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <button onClick={handleLogout} className="nav-link text-white bg-danger rounded-3 mb-2 px-3 py-3 border-0 w-100 text-start">
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
            <h1 className="h2">Admin Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <i className="bi bi-calendar3"></i>
                This week
              </button>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-6 col-xl-3">
              <div className="card bg-primary text-white">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-cart-fill me-3" style={{ fontSize: '2.5rem' }}></i>
                  <div>
                    <h5 className="card-title mb-0">Orders</h5>
                    <h3 className="mt-2 mb-0">254</h3>
                  </div>
                </div>
                <div className="card-footer bg-primary-dark text-center p-2">
                  <Link to="/admin/orders" className="text-white text-decoration-none">
                    View Details <i className="bi bi-arrow-right-circle"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-xl-3">
              <div className="card bg-success text-white">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-currency-dollar me-3" style={{ fontSize: '2.5rem' }}></i>
                  <div>
                    <h5 className="card-title mb-0">Revenue</h5>
                    <h3 className="mt-2 mb-0">₹45,200</h3>
                  </div>
                </div>
                <div className="card-footer bg-success-dark text-center p-2">
                  <a href="#" className="text-white text-decoration-none">
                    View Details <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-xl-3">
              <div className="card bg-warning text-dark">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-people-fill me-3" style={{ fontSize: '2.5rem' }}></i>
                  <div>
                    <h5 className="card-title mb-0">Customers</h5>
                    <h3 className="mt-2 mb-0">152</h3>
                  </div>
                </div>
                <div className="card-footer bg-warning-dark text-center p-2">
                  <a href="#" className="text-dark text-decoration-none">
                    View Details <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-xl-3">
              <div className="card bg-info text-white">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-box-seam me-3" style={{ fontSize: '2.5rem' }}></i>
                  <div>
                    <h5 className="card-title mb-0">Products</h5>
                    <h3 className="mt-2 mb-0">86</h3>
                  </div>
                </div>
                <div className="card-footer bg-info-dark text-center p-2">
                  <a href="#" className="text-white text-decoration-none">
                    View Details <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                <div className="card-header bg-white">
                  <h5 className="card-title mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <Link to="/admin/orders" className="btn btn-outline-primary w-100 py-3">
                        <i className="bi bi-cart-check fs-4 d-block mb-2"></i>
                        View Orders
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <a href="#" className="btn btn-outline-success w-100 py-3">
                        <i className="bi bi-plus-circle fs-4 d-block mb-2"></i>
                        Add Product
                      </a>
                    </div>
                    <div className="col-md-4">
                      <a href="#" className="btn btn-outline-info w-100 py-3">
                        <i className="bi bi-graph-up fs-4 d-block mb-2"></i>
                        View Reports
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
