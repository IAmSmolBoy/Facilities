import "./UpdateFacility.scss"

import { Component } from "react"
import { decodeToken } from "react-jwt"
import $ from "jquery"
import axios from "axios"


export default class UpdateFacility extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("userToken")
        var username
        if (token) username = decodeToken(token).username
        this.state = {
            data: { owner: username },
            err: null
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

        axios.put(process.env.REACT_APP_URL + "/facilities", this.state.data, {
            headers: {
                authtoken: localStorage.getItem("userToken"),
            }
        }).then((res) => {
            console.log(res)
            if (!res.data.message && "name" in res.data) {
                this.props.setType(null)
                window.location.reload()
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
        // Setting default values
        const facilityInfo = this.props.facility
        for (const attr in facilityInfo) {
            $(`input[name=${attr}], textarea[name=${attr}]`).val(facilityInfo[attr])
        }

        const newState = {
            data: facilityInfo
        }
        if ("img" in facilityInfo) {
            newState.src = facilityInfo.img
        }

        this.setState(newState)

        // jquery selection animation
        const FORM = $("div.update-facility");
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
                <div className="close-btn-container">
                    <button className="close-btn" onClick={(e) => this.props.setType(null)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <form onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}>
                    <section className="facility-img-sec">
                        <label htmlFor="pfp" id="previewImgLabel">
                            {
                                this.state.src ?
                                    <img src={this.state.src} alt="pfp" /> :
                                    <div><i className="fa fa-image"></i></div>
                            }
                        </label>
                        <input type="file" name="pfp" id="pfp" accept="image/*" />
                    </section>
                    <section className="form-sec">
                        <div className="update-facility">
                            <div id="focus"></div>
                            <h1>Facility Information</h1>
                            <input name="name" type="text" placeholder="Facility Name *" readOnly />
                            <input name="location" type="text" placeholder="Address *" required />
                            <textarea name="description" rows="5" placeholder="Description" onChange={this.onChange.bind(this)}></textarea>
                            <p className="errMsg">{this.state.err}</p>
                            <input type="submit" value="Save" />
                        </div>
                    </section>
                </form>
            </>
        )
    }
}