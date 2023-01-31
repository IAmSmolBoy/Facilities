import "./Explore.scss"

import { Component } from "react"
import { decodeToken } from "react-jwt"
import $, { data } from "jquery"
import axios from "axios"

export default class Explore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allFacilities: [],
            user: localStorage.getItem("userToken") ?
            decodeToken(localStorage.getItem("userToken")) :
            null
        }
    }

    facilityListElement(facility, favourited, showControls) {
        return (
            <li className="facility" key={facility.name}>
                <div className="card-background"></div>
                <div className="facility-img-container">
                    <img src={facility.img + "?dummy=" + (new Date()).getTime()} alt="Facility" className="facility-img" />
                </div>
                <div className="facility-info">
                    <div className="info-background"></div>
                    <h4 className="facility-name">{facility.name}</h4>
                    <h6 className="facility-owner">Owner: {facility.owner}</h6>
                    <h6 className="facility-location">Location: {facility.location}</h6>
                </div>
                <div className="facility-controls">
                    <div className="btn-column">
                        <div className="button-containers"><button className="view-details" onClick={(e) => this.viewFacility(facility)}>Update</button></div>
                        <div className="button-containers"><button className="booking-form" onClick={(e) => this.bookFacility(facility)}>Book</button></div>
                    </div>
                    <div className="btn-column">
                        <div className="favourites-btn-container">
                            <button className="favourites-btn" onClick={(e) => this.favouriteFacility(facility.name, favourited)}>
                            {
                                favourited ?
                                <i className="fa-solid fa-heart"></i> :
                                <i className="fa-regular fa-heart"></i>
                            }
                            </button>
                        </div>
                        <div className="favourites-btn-container">
                            <button className="delete-btn" onClick={(e) => this.deleteFacility(facility)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    bookFacility(facility) {
        this.props.setType("BookNow")
        this.props.setBookingFormName(facility.name)
    }

    viewFacility(facility) {
        this.props.setFacilityDetails(facility)
        this.props.setType("UpdateFacility")
    }

    favouriteFacility(facility) {
        if (this.state.user) {
            var favourites = []
            var favouritesModifier = ""
    
            if (this.state.favourites) {
                favourites = this.state.favourites
            }
    
            if (favourites.includes(facility)) {
                favourites.splice(favourites.indexOf(facility), 1)
                favouritesModifier = "delete"
    
            }
            else {
                favourites.push(facility)
                favouritesModifier = "add"
    
            }
            this.setState({ favourites })
            this.search(favourites)
            axios.put(`${process.env.REACT_APP_URL}/favourites/${favouritesModifier}`, {
                username: this.state.user.username,
                favourites: [facility]
            }, {
                headers: { authtoken: localStorage.getItem("userToken") }
            }).then(res => {
                if (res.data.token) {
                    localStorage.setItem("userToken", res.data.token)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    deleteFacility(deletedFacility) {
        const newFacilityList = this.state.allFacilities.filter(facility => facility.name !== deletedFacility.name)
        this.setState({
            allFacilities: newFacilityList
        })
        const formattedFacilityName = deletedFacility.name.split(" ").join("+")

        axios.delete(process.env.REACT_APP_URL + "/facilities/" + formattedFacilityName , {
            headers: { authtoken: localStorage.getItem("userToken") }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    filtersOnChange(e) {
        this.search(this.state.favourites)
    }

    search(favourites) {
        const filters = {}
        $("#filter-form :input").each((i, e) => {
            const filterName = $(e).hasClass("searchbar") ? "name" : "location"
            filters[filterName] = $(e).val()
        })

        function filterFacilities(facility) {
            for (const filter in filters) {
                if (filters[filter] !== "" && !facility[filter].includes(filters[filter])) {
                    return false
                }
            }
            return true
        }

        const newFacilityList = this.state.allFacilities
            .filter(filterFacilities)
            .map((facility) => this.facilityListElement(facility, favourites.includes(facility.name)))

        this.setState({
            facilityListItems: newFacilityList
        })
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_URL}/facilities`)
            .then((facilities) => {
                const facilityEleList = []

                for (const [ i, facility ] of facilities.data.entries()) {
                    facilityEleList.push(
                        this.facilityListElement(facility,
                            this.state.favourites && this.state.favourites.includes(facility.name)
                        )
                    )
                }
                this.setState({
                    allFacilities: facilities.data,
                    facilityListItems: facilityEleList
                })
            })
        if (this.state.user) {
            this.setState({
                favourites: this.state.user.favourites
            })
        }
    }

    render() {
        return (
            <>
                <section className="search-sec">
                    <h1 className="title">Explore</h1>
                    <h3 className="subheading">Search and filter</h3>
                    <form onChange={this.filtersOnChange.bind(this)} className="filters" id="filter-form">
                        <div className="input-divs">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" className="searchbar" />
                        </div>
                        <div className="input-divs">
                            <i className="fa-solid fa-location-dot"></i>
                            <input type="text" className="location" />
                        </div>
                    </form>
                </section>
                <section className="explore-sec">
                    <h3 className="subheading">Results</h3>
                    <ul className="resultList">{ this.state.facilityListItems }</ul>
                </section>
            </>
        )
    }
}