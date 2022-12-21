import Explore from "../../pages/Explore/Explore"
import Home from "../../pages/Home/Home"
import "./Layout.scss"

export default function Layout() {
    return (
        <main>
            <section className="leftec">
                <h1 className="title">Dashboard</h1>
                <h3 className="subheading">Current Bookings</h3>
                <Routes>
                    <Route path='/'>
                        <Route path="" element={<Home />} />
                        <Route path="/explore" element={<Explore />}/>
                    </Route>
                </Routes>
            </section>
            <section className="rightSec">
                <h3 className="subheading">Popular Facilities</h3>
            </section>
        </main>
    )
}