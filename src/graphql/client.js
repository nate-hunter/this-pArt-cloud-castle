import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';


const HASURA_SECRET_KEY = process.env.REACT_APP_HASURA_KEY;
const HASURA_URI = process.env.REACT_APP_HASURA_URI; 

const headers = { 'x-hasura-admin-secret': HASURA_SECRET_KEY }

const client = new ApolloClient({
    link: new WebSocketLink({
        uri: HASURA_URI,
        options: {
            reconnect: true,
            connectionParams: {
                headers
            }
        }

    }),
    cache: new InMemoryCache()
})

export default client;