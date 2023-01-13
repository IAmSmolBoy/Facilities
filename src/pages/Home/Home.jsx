import "./Home.scss"
import $ from "jquery"
import { useJwt } from "react-jwt";
import axios from "axios"

export default function Home() {

    const { reEvaluateToken } = useJwt()
    
    var role = JSON.stringify({ role: "unauthenticated" }), username = ""
    if (localStorage.getItem("userToken")) {
        role = localStorage.getItem("userToken")
        username = "/" + reEvaluateToken(localStorage.getItem("userToken")).decodedToken
    }
    axios.get('https://9xkibhbgh8.execute-api.us-east-1.amazonaws.com/bookings' + username, {
        headers: {
            authtoken: role
        }
    }).then((e) => {
        console.log(e)
    })
    // const xhr = new XMLHttpRequest()
    // xhr.open('GET',  + username, true)
    // xhr.onload = () => console.log(xhr.responseText)
    // xhr.setRequestHeader("authtoken", role)
    // xhr.setRequestHeader("Accept", true)
    // xhr.send()

    return (
        <>
            <section className="tableSec">
                <h1 className="title">Dashboard</h1>
                <h3 className="subheading">Current Bookings</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Facility Name</th>
                            <th>Owner</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Meeting Room</td>
                            <td>BenDover123</td>
                            <td>{(new Date()).toLocaleString()}</td>
                            <td>{(new Date()).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Meeting Room</td>
                            <td>BenDover123</td>
                            <td>{(new Date()).toLocaleString()}</td>
                            <td>{(new Date()).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Meeting Room</td>
                            <td>BenDover123</td>
                            <td>{(new Date()).toLocaleString()}</td>
                            <td>{(new Date()).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="popularSec">
                <h3 className="subheading">Favourited Facilities</h3>
                <ul className="popularList">
                    <li className="popularItem">
                        <img className="roomImg" src="https://www.justcoglobal.com/wp-content/uploads/2022/06/meeting-rooms.jpg" alt="Meeting Room" />
                        <div className="popularRoomInfo">
                            <h4>Meeting Room</h4>
                            <p>BenDover123</p>
                            <p>311 New Upper Changi Rd, Singapore 467360</p>
                        </div>
                    </li>
                    <li className="popularItem">
                        <img className="roomImg" src="https://www.justcoglobal.com/wp-content/uploads/2022/06/meeting-rooms.jpg" alt="Meeting Room" />
                        <div className="popularRoomInfo">
                            <h4>Meeting Room</h4>
                            <p>BenDover123</p>
                            <p>311 New Upper Changi Rd, Singapore 467360</p>
                        </div>
                    </li>
                    <li className="popularItem">
                        <img className="roomImg" src="https://www.justcoglobal.com/wp-content/uploads/2022/06/meeting-rooms.jpg" alt="Meeting Room" />
                        <div className="popularRoomInfo">
                            <h4>Meeting Room</h4>
                            <p>BenDover123</p>
                            <p>311 New Upper Changi Rd, Singapore 467360</p>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}