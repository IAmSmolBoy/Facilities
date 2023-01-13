import "./User.scss"
import { useState } from 'react'
import $ from "jquery"

export default function User() {

    const [ pfpData, setpfpData ] = useState("https://cdn-icons-png.flaticon.com/512/1946/1946429.png")
    const [ src, setsrc ] = useState("https://cdn-icons-png.flaticon.com/512/1946/1946429.png")

    async function handleFiles(e) {
        const pfp = e.target.files[0]
        // const reader = new FileReader()
        console.log(pfp, $("#pfp").prop("files")[0])
        setpfpData(pfp)
        setsrc(URL.createObjectURL(pfp))
    }

    return (
        <>
            <section className="pfpSec">
                <h1 className="title">Profile</h1>
                <label htmlFor="pfp" id="previewImgLabel">
                    <img src={src} alt="pfp" />
                </label>
                <input type="file" name="pfp" id="pfp" accept="image/*" onChange={handleFiles} />
            </section>
            <section className="detailsSec">
                <h3 className="subheading">User Details</h3>
            </section>
        </>
    )
}