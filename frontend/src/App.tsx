import React, { useContext } from "react";
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { useAppSelector } from "./app/hook";

import { getValidAccessToken } from "./authentication/realm/AuthenticateContext";
import { Global } from "@emotion/react";
import GlobalStyles from "./component/style/GlobalStyle";
import { getColorPaletteClass } from "./model/color/colorPalette";
import AppRouter from "./app/route/AppRouter";
import { configRouter } from "./app/route/config";

// Add your Realm App ID
const graphqlUri = `https://asia-south1.gcp.realm.mongodb.com/api/client/v2.0/app/application-0-pnrdn/graphql`;

const App = () => {
  const themeMode = useAppSelector(
    (state) => state.themeMode.colorPaletteString
  );
  const themeColorPalette = getColorPaletteClass(themeMode);

  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUri,
      // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
      // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
      // access token before sending the request.
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();

        options &&
          options?.headers &&
          (options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          });
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Global styles={GlobalStyles(themeColorPalette)} />
        <AppRouter />
      </ApolloProvider>
    </>
  );
};

export default App;
