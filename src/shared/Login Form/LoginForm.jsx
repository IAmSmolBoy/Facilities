import "./LoginForm.scss"

import { useState } from 'react'
import { decodeToken } from "react-jwt"
import axios from "axios"

export default function LoginForm({ setType, signUp, setUser }) {

    const [ data, setData ] = useState({ role: "member" })
    const [ formType, setFormType ] = useState(signUp)
    const [ loginErr, setLoginErr ] = useState(null)
    const [ registerErr, setRegisterErr ] = useState(null)

    const onChange = (e) => {
        data[e.target.name] = e.target.value
        setData(data)
    }

    function auth(e) {
        e.preventDefault()
        console.log(`${process.env.REACT_APP_URL}/${e.target.name === "login" ? "login" : "users"}`)
        axios.post(`${process.env.REACT_APP_URL}/${e.target.name === "login" ? "login" : "users"}`, data)
            .then((res) => {
                if (res.data.token) {
                    const newUser = decodeToken(res.data.token)
                    delete newUser.iat
                    setUser(newUser)
                    localStorage.setItem("userToken", res.data.token)
                    setType(null)
                }
                else {
                    if (e.target.name === "login") setLoginErr(res.data)
                    else setRegisterErr(res.data)
                    console.log(res.data)
                }
            }).catch(function (e) {
                console.log(e.message)
            })
    }

    return (
        <div className="formContainer">
            <div className="close-btn-container">
                <button className="close-btn" onClick={(e) => setType(null)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div className="section pb-5 pt-5 text-center">
                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" onChange={(e) => setFormType(e.target.checked)} checked={formType} />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                        <form name="login" onSubmit={auth} onChange={onChange} className="card-front">
                            <div className="center-wrap">
                                <div className="section text-center">
                                    <h4 className="mb-4 pb-3">Log In</h4>
                                    <div className="form-group">
                                        <input type="username" name="username" className="form-style" placeholder="Your username" id="logname" />
                                        <i className="input-icon uil uil-user"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" />
                                        <i className="input-icon uil uil-lock-alt"></i>
                                    </div>
                                    <h6 className="errMsg">{loginErr}</h6>
                                    <input type="submit" className="btn mt-4" />
                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                                </div>
                            </div>
                        </form>
                        <form name="signUp" onSubmit={auth} onChange={onChange} className="card-back">
                            <div className="center-wrap">
                                <div className="section text-center">
                                    <h4 className="mb-4 pb-3">Sign Up</h4>
                                    <div className="form-group">
                                        <input type="text" name="username" className="form-style" placeholder="Your Full Name" id="logname" />
                                        <i className="input-icon uil uil-user"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="email" name="email" className="form-style" placeholder="Your Email" id="logemail" />
                                        <i className="input-icon uil uil-at"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" />
                                        <i className="input-icon uil uil-lock-alt"></i>
                                    </div>
                                    <h6 className="errMsg">{registerErr}</h6>
                                    <input type="submit" className="btn mt-4" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}