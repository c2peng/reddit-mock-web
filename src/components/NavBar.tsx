import { Box, Button, Flex, Link } from "@chakra-ui/core";
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
          <Link color="black" mr={2}>
            login
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link color="black">Register</Link>
        </NextLink>
      </>
    );
  }
  //user is loggedin
  else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link"> Logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
