import './App.css';

import Layout from "./shared/Layout/Layout"
import Navbar from "./shared/Navbar/Navbar"

import { useState } from "react"
import { decodeToken } from "react-jwt"
import $ from "jquery"

function App() {
  var decoded
  if (localStorage.getItem("userToken")) {
    decoded = decodeToken(localStorage.getItem("userToken"))
    delete decoded.iat
  }

  const [ user, setUser ] = useState(decoded)
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
        <Navbar setType={setType} user={user} setUser={setUser} />
        <Layout setType={setType} user={user} modalType={modalType} setUser={setUser} />
      </div>
    </>
  );
}

export default App;