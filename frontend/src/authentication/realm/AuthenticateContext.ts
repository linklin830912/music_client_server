import { createContext } from "react";
import * as Realm from "realm-web";

const APP_ID = "application-0-pnrdn";
export const app = new Realm.App({ id: APP_ID });
const AuthenticateContext = createContext<Realm.App>(app);

// Gets a valid Realm user access token to authenticate requests
export async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. Tokens must be refreshed after
    // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
    await app.currentUser.refreshAccessToken();
  }
  return app.currentUser?.accessToken;
}
// Configure the ApolloClient to connect to your app's GraphQL endpoint

export default AuthenticateContext;
