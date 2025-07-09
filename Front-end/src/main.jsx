import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'; // Với antd v5
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import { UserProvider } from './context/userContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <ToastContainer
        position="top-right"      
        autoClose={3000}         
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"            
      />
    </UserProvider>
  </StrictMode>
)
