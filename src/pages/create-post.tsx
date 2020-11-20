import { Box,Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../util/createUrqlClient";
import { useIsAuth } from "../util/useIsAuth";

const CreatePost: React.FunctionComponent<{}> = (props) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              textarea={false}
              name="title"
              placeholder="title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button mt={4} isLoading={isSubmitting} color="green" type="submit">
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
