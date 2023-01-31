import "./AddFacility.scss"

import { Component } from "react"
import { decodeToken } from "react-jwt"
import $ from "jquery"
import axios from "axios"
import { Navigate } from "react-router-dom"


export default class AddFacility extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("userToken")
        var username
        if (token) username = decodeToken(token).username
        this.state = {
            data: { owner: username },
            err: null,
            redirect: null
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

        axios.post(process.env.REACT_APP_URL + "/facilities", this.state.data, {
            headers: {
                authtoken: localStorage.getItem("userToken"),
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.message && res.data === "Facility added") {
                this.setState({
                    redirect: <Navigate to="/explore" replace={true} />
                })
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
        // jquery selection animation
        const FORM = $("div.addFacility");
        const FOCUS = $("#focus");

        function position(e) {
            var offset = {
                top: e.offset().top,
                left: e.offset().left,
            };
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

        FORM.find("input[type=text], textarea").each(function (i) {
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
                <h1 className="title">Add Facility</h1>
                <form onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}>
                    <section className="facility-img-sec">
                    <label htmlFor="pfp" id="previewImgLabel">
                        {
                            this.state.src ?
                            <img src={this.state.src} alt="pfp" /> :
                            <div><i className="fa-solid fa-image"></i></div>
                        }
                    </label>
                    <input type="file" name="pfp" id="pfp" accept="image/*" required />
                    </section>
                    <section className="form-sec">
                        <div className="addFacility">
                            <div id="focus"></div>
                            <h1>Facility Information</h1>
                            <input name="name" type="text" placeholder="Facility Name *" required />
                            <input name="location" type="text" placeholder="Address *" required />
                            <textarea name="description" rows="5" placeholder="Description"></textarea>
                            <p className="errMsg">{this.state.err}</p>
                            <input type="submit" value="Add facility" />
                        </div>
                    </section>
                </form>
            </>
        )
    }
}