import Explore from "../../pages/Explore/Explore"
import Home from "../../pages/Home/Home"
import User from "../../pages/User/User"
import AddFacility from "../../pages/Add Facility/AddFacility"

import LoginForm from "../../shared/Login Form/LoginForm"
import BookingForm from '../../shared/Booking Form/BookingForm'
import ViewDetails from '../../shared/View Details/ViewDetails'
import UpdateFacility from '../../shared/Update Facility/UpdateFacility'

import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"

import "./Layout.scss"

export default function Layout({ setType, modalType, user, setUser }) {

    const [bookingList, setBookingList] = useState([])
    const [facilityList, setFacilityList] = useState([])

    const [bookingReadOnly, setBookingReadOnly] = useState(false)
    const [booking, setBooking] = useState()
    const [facilityDetails, setFacilityDetails] = useState({})

    useEffect(() => {
        if (modalType == null) {
            setBooking(null)
            setBookingReadOnly(false)
        }
    })

    return (
        <>
            <div id="modal" onClick={(e) => { if (e.target.id === "modal") setType(null) }}>
                <div className="modal-wrap">
                    {
                        ["login", "signUp"].includes(modalType) ?
                            <LoginForm setType={setType}
                                signUp={modalType === "signUp"}
                                setUser={setUser} /> :

                            modalType === "BookNow" ?
                                <BookingForm setType={setType}
                                    bookingList={bookingList}
                                    setBookingList={setBookingList}
                                    user={user}
                                    booking={booking}
                                    bookingReadOnly={bookingReadOnly} /> :

                            modalType === "UpdateFacility" ?
                                <UpdateFacility setType={setType}
                                    facility={facilityDetails}
                                    setFacilityList={setFacilityList} /> :
                            modalType === "ViewDetails" ?
                                <ViewDetails setType={setType}
                                facility={facilityDetails} /> : <></>
                    }
                </div>
            </div>
            <main>
                <Routes>
                    <Route path='/'>
                        <Route path="" element={<Home
                            setType={setType}
                            setBooking={setBooking}
                            bookingList={bookingList}
                            setBookingReadOnly={setBookingReadOnly}
                            setBookingList={setBookingList}
                            user={user} />} />
                        <Route path="/explore" element={<Explore
                            setType={setType}
                            setFacilityDetails={setFacilityDetails}
                            setBooking={setBooking}
                            facilityList={facilityList}
                            setFacilityList={setFacilityList}
                            user={user} />} />
                        <Route path="/user" element={<User
                            user={user}
                            setUser={setUser} />} />
                        <Route path="/add-facility" element={<AddFacility />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}