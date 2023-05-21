import { useEffect, useState } from "react";
import axios from "axios";

// Msal imports
import {
	MsalAuthenticationTemplate,
	useMsal,
	useAccount,
} from "@azure/msal-react";
import {
	InteractionStatus,
	InteractionType,
	InteractionRequiredAuthError,
	AccountInfo,
} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";

// Material-ui imports
import Paper from "@mui/material/Paper";
import EmailList from "./mail";

type ProfileData = {
	"@odata.context": string;
	businessPhones: string[];
	displayName: string;
	givenName: string | null;
	jobTitle: string | null;
	mail: string | null;
	mobilePhone: string | null;
	officeLocation: string | null;
	preferredLanguage: string | null;
	surname: string | null;
	userPrincipalName: string;
	id: string;
};

const ProfileContent = () => {
	const { instance, inProgress, accounts } = useMsal();
	const name = useAccount(accounts[0] || {});
	const [profileData, setProfileData] = useState<ProfileData | null>(null);

	useEffect(() => {
		if (!profileData && inProgress === InteractionStatus.None) {
			const fetchProfileData = async () => {
				try {
					const response = await axios.get<{ data: string }>(
						"http://localhost:8080/profile?name=" + name?.name?.split(" ")[0]
					);
					const data = JSON.parse(response.data.data) as ProfileData;
					setProfileData(data);
				} catch (e) {
					if (e instanceof InteractionRequiredAuthError) {
						instance.acquireTokenRedirect({
							...loginRequest,
							account: instance.getActiveAccount() as AccountInfo,
						});
					}
				}
			};

			fetchProfileData();
		}
	}, [inProgress, profileData, instance, name]);

	return (
		<Paper>
			<div>
				<h1>Profile Data:</h1>
				{profileData ? (
					<div>
						<p>Display Name: {profileData.displayName}</p>
						<p>User Principal Name: {profileData.userPrincipalName}</p>
						{/* Display other profile data as needed */}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</Paper>
	);
};

export function Profile() {
	const authRequest = {
		...loginRequest,
	};

	return (
		<MsalAuthenticationTemplate
			interactionType={InteractionType.Redirect}
			authenticationRequest={authRequest}
			errorComponent={ErrorComponent}
			loadingComponent={Loading}
		>
			<ProfileContent />
			<EmailList />
		</MsalAuthenticationTemplate>
	);
}
