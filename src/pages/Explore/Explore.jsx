import "./Explore.scss"

import { Component } from "react"
import $ from "jquery"
import axios from "axios"

export default class Explore extends Component {

    constructor(props) {
        super(props)
        const user = this.props.user
        this.state = {
            allFacilities: [],
            filters: { name: "", location: "" },
            favourites: user && user.favourites ? user.favourites : [],
        }
    }

    facilityListElement(facility, favourited, showControls, showFav) {
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
                <div className="btn-column">
                    <div className="button-containers"><button className="view-details" onClick={(e) => this.viewFacility(facility)}>View Details</button></div>
                    <div className="button-containers"><button className="booking-form" onClick={(e) => this.bookFacility(facility)} disabled={!this.props.user}>Book</button></div>
                </div>
                {
                    showControls &&
                    <div className="btn-column">
                        <div className="icon-btn-container">
                            <button onClick={(e) => this.updateFacility(facility)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <div className="icon-btn-container">
                            <button onClick={(e) => this.deleteFacility(facility)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                }
                {
                    showFav &&
                    <div className="btn-column">
                        <div className="icon-btn-container">
                            <button onClick={(e) => this.favouriteFacility(facility.name, favourited)}>
                                {
                                    favourited ?
                                        <i className="fa-solid fa-heart"></i> :
                                        <i className="fa-regular fa-heart"></i>
                                }
                            </button>
                        </div>
                    </div>
                }
            </li>
        )
    }

    updateFacility(facility) {
        this.props.setFacilityDetails(facility)
        this.props.setType("UpdateFacility")
    }

    viewFacility(facility) {
        this.props.setFacilityDetails(facility)
        this.props.setType("ViewDetails")
    }

    deleteFacility(deletedFacility) {
        const newFacilityList = this.state.allFacilities.filter(facility => facility.name !== deletedFacility.name)
        this.setState({ allFacilities: newFacilityList })
        const formattedFacilityName = deletedFacility.name.split(" ").join("+")

        axios.delete(`${process.env.REACT_APP_URL}/facilities/${formattedFacilityName}`, {
            headers: {
                authtoken: localStorage.getItem("userToken")
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    bookFacility(facility) {
        this.props.setBooking({
            facility: facility.name
        })
        this.props.setType("BookNow")
    }

    // Filter facilities by search and location filter values
    filterFacilities(facility, filters) {
        for (const filter in filters) {
            if (filters[filter] !== "" && !facility[filter].toLowerCase().includes(filters[filter].toLowerCase())) {
                return false
            }
        }
        return true
    }

    // Add filter values to state
    addFilter() {
        const filters = {}
        $("#filter-form :input").each((i, e) => {
            const filterName = $(e).hasClass("searchbar") ? "name" : "location"
            filters[filterName] = $(e).val()
        })
        this.setState({ filters })
    }

    favouriteFacility(facility) {
        if (this.state) {
            var favourites = this.state.favourites
            var favouritesModifier = ""

            if (favourites.includes(facility)) {
                favourites.splice(favourites.indexOf(facility), 1)
                favouritesModifier = "delete"
            }
            else {
                favourites.push(facility)
                favouritesModifier = "add"

            }

            this.setState({ favourites })

            console.log([facility])

            const favBody = {
                username: this.props.user.username,
                favourites: [facility]
            }
            const favConfig = {
                headers: {
                    authtoken: localStorage.getItem("userToken")
                }
            }
            axios.put(`${process.env.REACT_APP_URL}/favourites/${favouritesModifier}`, favBody, favConfig).then(res => {
                if (res.data.token) {
                    localStorage.setItem("userToken", res.data.token)
                }
                else {
                    console.log(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_URL}/facilities`)
            .then((res) => {
                const facilities = res.data
                this.setState({ allFacilities: facilities, })
                this.addFilter()
            })
    }

    render() {
        return (
            <>
                <section className="search-sec">
                    <h1 className="title">Explore</h1>
                    <h3 className="subheading">Search and filter</h3>
                    <form onChange={this.addFilter.bind(this)} className="filters" id="filter-form">
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
                    <ul className="resultList">
                        {
                            this.state.allFacilities
                                .filter(facility => this.filterFacilities(facility, this.state.filters))
                                .map(
                                    (facility) => this.facilityListElement(
                                        facility,
                                        this.state.favourites.includes(facility.name),
                                        this.props.user && ["admin", "owner"].includes(this.props.user.role),
                                        this.props.user
                                    )
                                )
                        }
                    </ul>
                </section>
            </>
        )
    }
}