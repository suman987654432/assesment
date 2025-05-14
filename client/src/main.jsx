import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
       <Toaster position="top-center" />
    </Provider>
  </React.StrictMode>
)
