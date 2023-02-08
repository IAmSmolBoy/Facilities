import "./ViewDetails.scss"

import { useEffect } from "react"

import $ from "jquery"

export default function ViewDetails({ setType, facility }) {

    useEffect(() => {
        $(".view-details-modal img").on("click", function(e) {
            $(e.target).toggleClass("enlarge")
            if ($(e.target).hasClass("enlarge")) {
                $(".modal-wrap").css("overflow", "visible")
            }
            else {
                setTimeout(() => {
                    $(".modal-wrap").css("overflow", "hidden")
                }, 300);
            }
        })
    }, [])

    return (
        <div className="view-details-modal-container">
            <div className="view-details-modal" id="cookiesPopup">
                <button className="close">✖</button>
                <img src={facility.img} alt="cookies-img" />
                <ul className="facility-info-list">
                    <h2 className="facility-name">Facility Name: {facility.name}</h2>
                    <h4 className="facility-name">Facility Owner: {facility.owner}</h4>
                    <h4 className="facility-name">location: {facility.location}</h4>
                    <h4 className="facility-name">Description: {facility.description}</h4>
                </ul>
            </div>
        </div>
    )
}