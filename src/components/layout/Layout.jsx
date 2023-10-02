import Sidebar from "../sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./layout.css";
const Layout = ({ children,pageName }) => {
  return (
    
    <div className="app-layout">
      <Sidebar />
      <div className="layout-container">
        <ToastContainer 
          position="top-right"
          autoClose={5000} />
        <h6 className="pt-4" style={{color:'#75787B'}}>{pageName}</h6>
        <div className="layout-children-container">{children}</div>
      </div>
    </div>
  );
};    
   
export default Layout;
