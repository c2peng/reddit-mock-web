import React from "react";
import { Form, Formik } from "formik";
import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ values, handleChange, isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>
						<Box mt={4}>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
						</Box>
						<Button mt={4} isloading={isSubmitting} color="green" type="submit">
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;
