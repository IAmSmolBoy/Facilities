import './App.css';

import Layout from "./shared/Layout/Layout"
import Navbar from "./shared/Navbar/Navbar"

import { useState } from "react"
import $ from "jquery"

function App() {
  const [ token, setToken ] = useState(localStorage.getItem("userToken"))
  const [ modalType, setModalType ] = useState(null)

  function setType(type) {
    if (type !== null) {
      setModalType(type)
      $('#modal').removeAttr('class').addClass("show");
      $('body').addClass('modal-active');
    }
    else {
      $("#modal").removeAttr('class');
      setTimeout(() => {
        setModalType(type)
        $('body').removeClass('modal-active');
      }, 500);
    }
  }

  return (
    <>
      <div className="page">
        <Navbar setType={setType} token={token} setToken={setToken} />
        <Layout setType={setType} modalType={modalType} setToken={setToken} />
      </div>
    </>
  );
}

export default App;