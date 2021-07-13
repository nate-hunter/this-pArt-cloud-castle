import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';


// Remove before pushing to github

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