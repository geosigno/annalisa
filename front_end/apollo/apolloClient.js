import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { getBearer } from '../helpers/auth';
import { typeDefs, resolvers } from './resolver';

export default function createApolloClient(initialState, ctx) {
	// The `ctx` (NextPageContext) will only be present on the server.
	// use it to extract auth headers (ctx.req) or similar.
	const apolloClient = new ApolloClient({
		ssrMode: Boolean(ctx),
		link: new HttpLink({
			uri: 'http://localhost:1337/graphql', // Server URL (must be absolute)
			credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
			fetch,
			headers: getBearer() // auth token
		}),
		cache: new InMemoryCache().restore(initialState),
		typeDefs,
		resolvers
	});
	// cache.writeData({
	// 	data: {
	// 	  username: null
	// 	}
	// });
	return apolloClient;
}
