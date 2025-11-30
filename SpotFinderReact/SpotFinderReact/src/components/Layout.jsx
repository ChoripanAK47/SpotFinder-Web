import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid px-4 py-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};



export default Layout;
