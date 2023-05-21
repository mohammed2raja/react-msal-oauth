import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
	useAccount,
	useMsal,
} from "@azure/msal-react";
import Typography from "@mui/material/Typography";
import { loginRequest } from "../authConfig";
import { msalInstance } from "../index";
import { useEffect } from "react";
import { Profile } from "./Profile";

const SaveAccessToken = () => {
	const { accounts } = useMsal();
	const account = useAccount(accounts[0] || {});

	useEffect(() => {
		const account = msalInstance.getActiveAccount();
		if (!account) {
			throw Error(
				"No active account! Verify a user has been signed in and setActiveAccount has been called."
			);
		}

		msalInstance
			.acquireTokenSilent({
				...loginRequest,
				account: account,
			})
			.then((response) => {
				console.log(response.account);
				fetch("http://localhost:8080", {
					method: "POST",
					headers: {
						Accept: "application.json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						access_token: response.accessToken,
						user: account.name?.split(" ")[0],
					}),
					cache: "default",
				});
			});
	}, [account]);

	return <Profile />;
};
export function Home() {
	return (
		<>
			<AuthenticatedTemplate>
				<SaveAccessToken />
				{/* <ButtonGroup orientation="vertical">
              <Button component={RouterLink} to="/profile" variant="contained" color="primary">Request Profile Information</Button>
            </ButtonGroup> */}
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<Typography variant="h6" align="center">
					Please sign-in to see your profile information.
				</Typography>
			</UnauthenticatedTemplate>
		</>
	);
}
