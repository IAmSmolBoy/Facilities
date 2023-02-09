import "./Home.scss"

import { decodeToken } from "react-jwt";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";

export default function Home({ setType, setBooking, bookingList, setBookingList, setBookingReadOnly, user }) {

    const [ facilities, setFacilities ] = useState([])

    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_URL}/bookings/${user.username.replaceAll(" ", "+")}`, {
                headers: { authtoken: localStorage.getItem("userToken") }
            }).then((res) => {
                setBookingList(res.data)
            }, e => console.log(e.message))
            
            axios.get(`${process.env.REACT_APP_URL}/facilities`)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        console.log(res.data)
                        const favouritedFacilities = res.data
                            .filter(facility => user.favourites && user.favourites.includes(facility.name))
                            .map(favouritedFacility)
                        setFacilities(favouritedFacilities)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [])

    function editBooking(booking) {
        setBooking(booking)
        setBookingReadOnly(true)
        setType("BookNow")
    }

    function deleteBooking(deletedBooking) {
        var tempBookings = bookingList
        const bookingIndex = tempBookings.findIndex(booking => booking.facility === deletedBooking.facility)
        tempBookings.splice(bookingIndex, 1)
        console.log(bookingList)
        setBookingList(tempBookings)

        const facility = deletedBooking.facility.split(" ").join("+"),
            booker = deletedBooking.booker.split(" ").join("+")
            
        axios.delete(`${process.env.REACT_APP_URL}/bookings/${facility}/${booker}`, {
            headers: { authtoken: localStorage.getItem("userToken")  }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    // booking row template
    const bookingRow = (booking) => (
        <tr key={booking.facility}>
            <td>{booking.facility}</td>
            <td>{booking.owner}</td>
            <td>{booking.startDate}</td>
            <td>{booking.endDate}</td>
            <td>
                <button className="control-btn" onClick={(e) => editBooking(booking)}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="control-btn" onClick={(e) => deleteBooking(booking)}><i className="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    )

    // favourited facilities list item template
    const favouritedFacility = (facility) => (
        <li className="popularItem" key={facility.name}>
            <img className="roomImg" src={facility.img} alt="Meeting Room" />
            <div className="popularRoomInfo">
                <h4>{facility.name}</h4>
                <p>Owner: {facility.owner}</p>
                <p>Location: {facility.location}</p>
            </div>
        </li>
    )

    return (
        <>
            <section className="tableSec">
                <h1 className="title">Dashboard</h1>
                <h3 className="subheading">Current Bookings</h3>
                {
                    localStorage.getItem("userToken") ?
                    <table>
                        <thead>
                            <tr>
                                <th>Facility Name</th>
                                <th>Owner</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>{ bookingList.map(bookingRow) }</tbody>
                    </table> :
                    <h4>Log in to see your bookings!</h4>
                }
                
            </section>
            <section className="popularSec">
                <h3 className="subheading">Favourited Facilities</h3>
                <ul className="popularList">{ facilities }</ul>
            </section>
        </>
    )
}