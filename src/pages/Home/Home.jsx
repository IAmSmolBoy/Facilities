import "./Home.scss"

export default function Home() {
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
                <h3 className="subheading">Popular Facilities</h3>
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