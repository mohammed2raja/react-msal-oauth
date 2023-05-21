import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMsal, useAccount } from "@azure/msal-react";

type Message = {
	subject: string;
	body: {
		contentType: string;
		content: string;
	};
};

interface Data {
	value?: Message[];
	data?: string;
}

const EmailList: React.FC = () => {
	const { accounts } = useMsal();
	const name = useAccount(accounts[0] || {});
	const [emails, setEmails] = useState<Message[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchEmails = async () => {
			try {
				const response = await axios.get<Data>(
					`http://localhost:8080/me/messages?name=${name?.name?.split(" ")[0]}`
				);
				const data = JSON.parse(response.data.data || "");

				if (data?.value) {
					setEmails(data.value);
					setError("");
				} else if (data?.error) {
					setEmails([]);
					setError(data.error.message);
				}
			} catch (error) {
				console.log("Error retrieving emails:", error);
				setEmails([]);
				setError("Error retrieving emails. Please try again later.");
			}
		};

		fetchEmails();
	}, [name?.name]);

	return (
		<div>
			<h1>Email List</h1>
			{error ? (
				<p>{error}</p>
			) : (
				emails.map((email, index) => (
					<div key={index}>
						<h3>{email.subject}</h3>
						<p>{email.body.content}</p>
					</div>
				))
			)}
		</div>
	);
};

export default EmailList;
