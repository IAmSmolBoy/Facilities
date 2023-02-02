import Explore from "../../pages/Explore/Explore"
import Home from "../../pages/Home/Home"
import User from "../../pages/User/User"
import AddFacility from "../../pages/Add Facility/AddFacility"

import LoginForm from "../../shared/Login Form/LoginForm"
import BookingForm from '../../shared/Booking Form/BookingForm'
import UpdateFacility from '../../shared/Update Facility/UpdateFacility'

import { Route, Routes } from "react-router-dom"
import { useState } from "react"

import "./Layout.scss"
import { useEffect } from "react"

export default function Layout({setType, modalType, setToken}) {
  
    const [ bookingList, setBookingList ] = useState([])
    const [ facilityList, setFacilityList ] = useState([])
  
    const [ bookingFormName, setBookingFormName ] = useState("")
    const [ booking, setBooking ] = useState({})
    const [ facilityDetails, setFacilityDetails ] = useState({})

    if (!modalType) {
        if (bookingList.length > 0) setBookingList([])
        if (facilityList.length > 0) setFacilityList([])
        if (bookingFormName !== "") setBookingFormName("")
        if (JSON.stringify(booking) !== "{}") setBooking({})
        if (JSON.stringify(facilityDetails) !== "{}") setFacilityDetails({})
    }

    return (
        <>
            <div id="modal" onClick={(e) => { if (e.target.id === "modal") setType(null) }}>
                <div className="modal-wrap">
                    {
                        ["login", "signUp"].includes(modalType) ?
                        <LoginForm setType={setType}
                        signUp={modalType === "signUp"}
                        setToken={setToken} /> :

                        modalType === "BookNow" ?
                        <BookingForm setType={setType}
                        bookingList={bookingList}
                        setBookingList={setBookingList}
                        name={bookingFormName}
                        booking={booking} /> :
                        
                        modalType === "UpdateFacility" ?
                        <UpdateFacility setType={setType}
                        facility={facilityDetails}
                        setFacilityList={setFacilityList} /> : <></>
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
                            setBookingList={setBookingList} />} />
                        <Route path="/explore" element={<Explore
                            setType={setType}
                            setBookingFormName={setBookingFormName}
                            setFacilityDetails={setFacilityDetails}
                            facilityList={facilityList}
                            setFacilityList={setFacilityList} />} />
                        <Route path="/user" element={<User setToken={setToken} />} />
                        <Route path="/add-facility" element={<AddFacility />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}