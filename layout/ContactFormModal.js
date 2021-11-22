import { useState } from "react";
// ACTIONS
import { addEmail } from "@/actions/emails";
// HELPERS
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React from "react";

const ContactFormModal = () => {
	const [contactData, setContactData] = useState({
		name: ``,
		email: ``,
		subject: `greetings`,
		text: ``,
	});

	const { name, email, subject, text } = contactData;

	const [validated, setValidated] = useState(false);
	const [error, setError] = useState(false);

	const handleChange = (name) => (e) => {
		setContactData({ ...contactData, [name]: e.target.value });
	};

	const sendEmail = async (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		e.preventDefault();
		setValidated(true);
		await addEmail(contactData)()
			.then(() => {
				setContactData({
					name: ``,
					email: ``,
					subject: `greetings`,
					text: ``,
				});
				resetForm();
			})
			.catch((err) => {
				setError(true);
			});
	};

	const resetForm = () => {
		setContactData({
			name: ``,
			email: ``,
			subject: `greetings`,
			text: ``,
		});
	};

	return (
		<Form
			className={`form`}
			noValidate
			validated={validated}
			onSubmit={sendEmail}
		>
			{/* Name */}
			<Form.Label htmlFor={`name`}>Name:</Form.Label>
			<Form.Control
				type={`text`}
				placeholder={`Name`}
				aria-label={`Name`}
				aria-describedby={`name-text`}
				autoComplete={`name`}
				name={`name`}
				id={`name`}
				value={name}
				onChange={handleChange("name")}
				minLength={`6`}
				required
			/>
			{/* Email */}
			<Form.Label htmlFor={`email`}>Email:</Form.Label>
			<Form.Control
				type={`email`}
				placeholder={`Email Address`}
				aria-label={`email`}
				aria-describedby={`email-text`}
				autoComplete={`email`}
				name={`email`}
				id={`email`}
				value={email}
				onChange={handleChange("email")}
				required
			/>
			{/* Subject */}
			<Form.Label htmlFor={`subject`}>Subject:</Form.Label>
			<Form.Control
				as={`select`}
				aria-label={`Subject`}
				aria-describedby={`subject-text`}
				name={`subject`}
				id={`subject`}
				value={subject}
				onChange={handleChange("subject")}
				required
			>
				<option vlaue={`suggestion`}>Suggestion</option>
				<option value={`bug`}>Bug</option>
				<option value={`review`}>Review</option>
				<option value={`greetings`}>Greetings</option>
			</Form.Control>
			{/* Message */}
			<Form.Label htmlFor={`text`}>Message:</Form.Label>
			<Form.Control
				as={`textarea`}
				name={`text`}
				cols={`30`}
				rows={`3`}
				placeholder={`Here goes the message`}
				id={`text`}
				value={text}
				onChange={handleChange("text")}
				required
			/>
			{/* Buttons */}
			<Button
				variant={`dark`}
				size={`sm`}
				className={`float-left mt-4`}
				type={`submit`}
			>
				Send
			</Button>
			<Button
				variant={`secondary`}
				className={`float-right mt-4`}
				type={`reset`}
				size={`sm`}
				onClick={resetForm}
			>
				Reset
			</Button>
		</Form>
	);
};

export default ContactFormModal;
