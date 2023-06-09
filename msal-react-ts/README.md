# MSAL.js for React TypeScript Authorization Code Flow in Single-Page Applications

## About this sample

This developer sample is used to run basic use cases for the MSAL library. You can also alter the configuration in `./src/authConfig.js` to execute other behaviors.
This sample was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notable files and what they demonstrate

1. `./src/App.tsx` - Shows implementation of `MsalProvider`, all children will have access to `@azure/msal-react` context, hooks and components.
1. `./src/index.tsx` - Shows intialization of the `PublicClientApplication` that is passed to `App.js`
1. `./src/pages/Home.tsx` - Homepage, shows how to conditionally render content using `AuthenticatedTemplate` and `UnauthenticatedTemplate` depending on whether or not a user is signed in.
1. `./src/pages/Profile.tsx` - Example of a protected route using `MsalAuthenticationTemplate`. If a user is not yet signed in, signin will be invoked automatically. If a user is signed in it will acquire an access token and make a call to MS Graph to fetch user profile data.
1. `./src/authConfig.ts` - Configuration options for `PublicClientApplication` and token requests.
1. `./src/ui-components/SignInSignOutButton.tsx` - Example of how to conditionally render a Sign In or Sign Out button using the `useIsAuthenticated` hook.
1. `./src/ui-components/SignInButton.tsx` - Example of how to get the `PublicClientApplication` instance using the `useMsal` hook and invoking a login function.
1. `./src/ui-components/SignOutButton.tsx` - Example of how to get the `PublicClientApplication` instance using the `useMsal` hook and invoking a logout function.
1. `./src/utils/MsGraphApiCall.ts` - Example of how to call the MS Graph API with an access token.
1. `./src/utils/NavigationClient.ts` - Example implementation of `INavigationClient` which can be used to override the default navigation functions MSAL.js uses

## How to run the sample

### Pre-requisites

- Ensure [all pre-requisites](../../../lib/msal-react/README.md#prerequisites) have been completed to run `@azure/msal-react`.
- Install node.js if needed (<https://nodejs.org/en/>).

### Configure the application

- Open `./src/authConfig.ts` in an editor.
- Replace client id with the Application (client) ID from the portal registration, or use the currently configured lab registration.
  - Optionally, you may replace any of the other parameters, or you can remove them and use the default values.

#### Install npm dependencies for sample

##### Installing @azure/msal-react and @azure/msal-browser from local builds

```bash
# Install dev dependencies for msal-react and msal-browser from root of repo
npm install

# Build packages locally
npm run build:package

# Install local libs
npm run install:local

# Install sample dependencies
npm install
```

Note: If you suspect you are not using the local builds check that the `package.json` file shows the following dependencies:

```
"@azure/msal-react": "file:../../../lib/msal-react",
"@azure/msal-browser": "file:../../../lib/msal-browser",
"react": "file:../../../lib/msal-react/node_modules/react",
"react-dom": "file:../../../lib/msal-react/node_modules/react-dom",
```

##### Installing @azure/msal-react and @azure/msal-browser from released versions available on npm

```bash
# Install packages from npm
npm run install:published

# Install rest of dependencies
npm install
```

#### Running the development server

1. In a command prompt, run `npm start`.
1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
1. Open [http://localhost:3000/profile](http://localhost:3000/profile) to see an example of a protected route. If you are not yet signed in, signin will be invoked automatically.

The page will reload if you make edits.
You will also see any lint errors in the console.

- In the web page, click on the "Login" button and select either `Sign in using Popup` or `Sign in using Redirect` to begin the auth flow.

#### Running the sample production server

1. In a command prompt, run `npm run build`.
1. Next run `serve -s build`
1. Open [http://localhost:5000](http://localhost:3000) to view it in the browser.
1. Open [http://localhost:5000/profile](http://localhost:3000/profile) to see an example of a protected route. If you are not yet signed in, signin will be invoked automatically.
