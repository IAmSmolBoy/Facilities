import Explore from "../../pages/Explore/Explore"
import Home from "../../pages/Home/Home"
import User from "../../pages/User/User"

import { Route, Routes } from "react-router-dom"
import "./Layout.scss"

export default function Layout() {
    return (
        <>
            <main>
                <Routes>
                    <Route path='/'>
                        <Route path="" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/user" element={<User />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}