import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";

import theme from "../theme";

import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { MeDocument, Query } from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
	cache: Cache,
	qi: QueryInput,
	result: any,
	fn: (r: Result, q: Query) => Query
) {
	return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
	url: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "include",
	},
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					login: (result, args, cache, info) => {
						cache.updateQuery({ query: MeDocument }, (data) => {});
					},
				},
			},
		}),
		fetchExchange,
	],
});

function MyApp({ Component, pageProps }: any) {
	return (
		<Provider value={client}>
			<ThemeProvider theme={theme}>
				<CSSReset />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
