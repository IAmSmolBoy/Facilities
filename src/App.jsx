import './App.css';
import Layout from "./shared/Layout/Layout"
import Navbar from "./shared/Navbar/Navbar"
import LoginForm from "./shared/LoginForm/LoginForm"
import $ from "jquery"

import { useState } from 'react'

function App() {

  const [ modalType, setModalType ] = useState(null)

  function setType(type) {
    setModalType(type)
    if (type !== null) {
      $('#modal-container').removeAttr('class').addClass("four");
      $('body').addClass('modal-active');
    }
    else {
      $("#modal-container").addClass('out');
      setTimeout(() => {
        $('body').removeClass('modal-active');
      }, 500);
    }
  }

  return (
    <>
      <div id="modal-container">
        <div className="modal-background">
          {
            modalType === "login" && <LoginForm setType={setType} />
          }
        </div>
      </div>
      <div className="page">
        <Navbar setType={setType} />
        <Layout />
      </div>
    </>
  );
}

export default App;