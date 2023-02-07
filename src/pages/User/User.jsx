import "./User.scss"

import $ from "jquery"
import axios from "axios"
import { decodeToken } from "react-jwt"
import { Component } from "react"
import { Navigate } from "react-router-dom"

export default class User extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("userToken")
        var username
        if (token) username = decodeToken(token).username
        this.state = {
            data: { owner: username },
            err: null,
            redirect: null,
            visibility: false
        }
    }

    readAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.onerror = reject
          fr.onload = function () {
            resolve(fr.result)
          }
          fr.readAsDataURL(file)
        })
    }

    deleteUser() {
        console.log(this.state.data.username)
        const formattedUsername = this.state.data.username.split(" ").join("+")
        axios.delete(process.env.REACT_APP_URL + "/users/" + formattedUsername, {
            headers: { authtoken: localStorage.getItem("userToken") }
        }).then(res => {
            console.log(res)
            this.setState({ redirect: <Navigate to="/" replace={true} /> })
            localStorage.clear()
        }).catch(err => console.log(err))
    }

    onChange(e) {
        if (e.target.id !== "pfp") {
            this.setState({
                data: {
                    ...this.state.data,
                    [e.target.name]: e.target.value
                },
            })
        }
        else {
            const pfp = e.target.files[0]
            Promise.all([this.readAsDataURL(pfp)])
                .then((e) => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            file: e[0],
                            fileType: pfp.type.slice(6)
                        },
                        src: URL.createObjectURL(pfp)
                    })
                })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.data)

        const fd = new FormData()
        for (const item in this.state.data) {
            fd.append(item, this.state.data[item])
        }

        axios.put(process.env.REACT_APP_URL + "/users", this.state.data, {
            headers: {
                authtoken: localStorage.getItem("userToken"),
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.message && res.data.token) {
                localStorage.setItem("userToken", res.data.token)
                this.props.setToken(res.data.token)
                alert("user saved")
            }
            else {
                this.setState({ err: res.data })
                console.log(res.data)
            }
        }, e => {
            this.setState({ err: e.message })
            console.log(e)
        })
    }

    componentDidMount() {
        const user = decodeToken(localStorage.getItem("userToken"))
        delete user.iat
        console.log(user)

        if (user.img) {
            this.setState({
                src: user.img
            })
        }

        for (const userAttr in user) {
            $(`input[name="${userAttr}"]`).val(user[userAttr])
            this.setState({
                data: user
            })
        }

        // jquery selection animation
        const FORM = $("div.profile-page");
        const FOCUS = $("#focus");

        function position(e) {
            var offset = {
                top: e.offset().top,
                left: e.offset().left,
            }
            var sizes = {
                width: e.outerWidth(),
                height: e.outerHeight(),
                radius: parseInt(e.css("border-radius"))
            }

            FOCUS.fadeIn(200);

            // set position
            FOCUS.offset(offset);

            FOCUS.css(sizes)
        }

        FORM.find("input[type=text], input[type=password]").each(function (i) {
            $(this).on("focus", function () {
                const el = $(this);

                $(window).on("resize", function () {
                    position(el);
                });

                position(el);
            });
        });

        FORM.on("focusout", function (e) {
            setTimeout(function () {
                if (!e.delegateTarget.contains(document.activeElement)) {
                    FOCUS.fadeOut(200);
                }
            }, 0);
        });
    }

    render() {
        return (
            <>
                { this.state.redirect }
                <h1 className="title">Profile Page</h1>
                <form onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}>
                    <section className="facility-img-sec">
                        <label htmlFor="pfp" id="previewImgLabel">
                            <img src={this.state.src ? this.state.src : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} alt="pfp" />
                        </label>
                        <input type="file" name="pfp" id="pfp" accept="image/*" required />
                    </section>
                    <section className="form-sec">
                        <div className="profile-page">
                            <div id="focus"></div>
                            <h1>User Details</h1>
                            <input name="username" type="text" placeholder="Userame *" required />
                            <input name="email" type="text" placeholder="email *" required />
                            <div className="password-div">
                                <input name="password" type={this.state.visibility ? "text" : "password"} placeholder="password *" required />
                                <button type="button" className="visbility-btn" onClick={(e) => this.setState({ visibility: !this.state.visibility })}>
                                    {
                                        this.state.visibility ?
                                        <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="hide password" /> :
                                        <img src="https://cdn-icons-png.flaticon.com/512/159/159078.png" alt="show password" />
                                    }
                                </button>
                            </div>
                            <p className="errMsg">{this.state.err}</p>
                            <button type="button" className="delete-btn" onClick={this.deleteUser.bind(this)}>Delete</button>
                            <input type="submit" value="Save" />
                        </div>
                    </section>
                </form>
            </>
        )
    }
}