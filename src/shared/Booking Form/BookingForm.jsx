import "./BookingForm.scss"

import { Component } from "react";
import { decodeToken } from "react-jwt";
import $ from "jquery"
import axios from "axios"

export default class BookingForm extends Component {

	constructor(props) {
		super(props)

		const token = localStorage.getItem("userToken")
		var username
		if (token) username = decodeToken(token).username

		var data = { booker: username }

		if (this.props.name) {
			data.facility = this.props.name
		}
		if (this.props.booking) {
			data = this.props.booking
		}
		
		this.state = {
			data,
			err: null
		}
	}

	componentDidMount() {
		const today = new Date()
		today.setDate(today.getDate() + 1)
		$(".datepicker-here").prop("min", today.toISOString().split('T')[0])
		if (this.props.name) $(`input[name="facility"]`).val(this.props.name)
		else if (this.props.booking) {
			for (const attr in this.props.booking) {
				$(`input[name="${attr}"`).val(this.props.booking[attr])
			}
		}
	}
	
    onChange(e) {
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			}
		})
    }

	onSubmit(e) {
        e.preventDefault()

		const uri = process.env.REACT_APP_URL + "/bookings",
			config = {
				headers: {
					authtoken: localStorage.getItem("userToken")
				}
			}

		if (this.props.booking) {
			axios.put(uri, this.state.data, config)
				.then((res) => {
					if (res.data && res.data.facility) {
						var bookings = this.props.bookingList

						for (const [i, booking] of bookings.entries()) {
							if (booking.facility === this.props.booking.facility) {
								bookings[i] = this.state.data
							}
						}
		
						this.props.setBookingList(bookings)
						this.props.setType(null)
					}
					else {
						this.setState({ err: res.data })
						console.log(res.data)
					}
				}, e => {
					this.setState({ err: e.message })
					console.log(e)
				})
		}
		else {
			axios.post(uri, this.state.data, config)
				.then((res) => {
					if (res.data === "Success") {
						this.props.setBookingList([ ...this.props.bookingList, this.state.data ])
						this.props.setType(null)
					}
					else {
						this.setState({ err: res.data })
						console.log(res.data)
					}
				}, e => {
					this.setState({ err: e.message })
					console.log(e)
				})
		}
	}

	render() {
		return (
			<div className="wrapper">
				<div className="inner">
					<form onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)}>
						<div className="close-btn-container">
							<button className="close-btn" onClick={(e) => this.props.setType(null)}>
								<i className="fa fa-times" aria-hidden="true"></i>
							</button>
						</div>
						<h3>Find a Room</h3>
						<div className="form-row">
							<div className="form-wrapper">
								<label>Facility Name *</label>
								<input name="facility" type="text" className="form-control" placeholder="The Facility Name" readOnly={this.props.booking} required />
							</div>
							<div className="form-wrapper">
								<label>Phone No. </label>
								<input name="phone" type="tel" className="form-control" placeholder="Phone Number" />
							</div>
						</div>
						<div className="form-row">
							<div className="form-wrapper">
								<label>Check-in *</label>
								<input name="startDate" type="date" className="form-control datepicker-here" id="dp1" required />
							</div>
							<div className="form-wrapper">
								<label>Check-out *</label>
								<input name="endDate" type="date" className="form-control datepicker-here" id="dp2" required />
							</div>
						</div>
						{ this.state.err && <h6 className="errMsg">{this.state.err}</h6> }
						<button data-text="Book Room">
							<span>Book Room</span>
						</button>
					</form>
				</div>
			</div>
		)
	}
}