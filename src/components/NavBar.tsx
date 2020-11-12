import { Box, Flex, Link } from "@chakra-ui/core";
import * as React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FunctionComponent<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	let body = null;
	//data loading
	if (fetching) {
	}
	//user not loggedin
	else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Link color="white" mr={2}>
						login
					</Link>
				</NextLink>

				<NextLink href="/register">
					<Link color="white">Register</Link>
				</NextLink>
			</>
		);
	}
	//user is loggedin
	else {
    body = (
    <Box>{data.me.username}</Box>
    )
	}
	return (
		<Flex bg="tomato" p={4}>
			<Box ml={"auto"}>{body}</Box>
		</Flex>
	);
};

export default NavBar;
