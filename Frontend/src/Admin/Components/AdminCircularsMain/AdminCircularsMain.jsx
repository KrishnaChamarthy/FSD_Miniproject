import React, { useContext, useState } from "react";
import "./AdminCircularsMain.css";
import { StoreContext } from "../../../context/StoreContext";
import AdminCircularsList from "../AdminCircularsList/AdminCircularsList";
import AdminCircularsCreate from "../AdminCircularsCreate/AdminCircularsCreate";
import AdminCircularsView from "../AdminCircularsView/AdminCircularsView";

const AdminCircularsMain = () => {
  const { circularsList } = useContext(StoreContext);

  const [circular, setCircular] = useState(null);
  const [activePage, setActivePage] = useState("list");

  const handlePageRender = () => {
    if (activePage === "list")
      return (
        <AdminCircularsList
          circularsList={circularsList}
          setActivePage={setActivePage}
          setCircular={setCircular}
        />
      );
    else if (activePage === "create") return <AdminCircularsCreate setActivePage={setActivePage}/>;
    else if (activePage === "view") return <AdminCircularsView circular={circular} setActivePage={setActivePage}/>;
  };

  return (
    <div className="admin-circulars-container">
      <header>
        <div className="header-text">
          Post Circulars
          <br />
          <span>Post Circulars To Share Information.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="admin-circulars-body">{handlePageRender()}</div>
    </div>
  );
};

export default AdminCircularsMain;
