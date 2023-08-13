"use client";
import { useEffect, useState } from "react";
import {
  Container,
  VStack,
  Button,
  Heading,
  Input,
  useToast,
  SimpleGrid,
  Icon,
  Img,
  Box,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { supabase } from "@db/client";
import { Subheader } from "@/components/subheader";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { authBroadcast } from "../context";

interface FormParams {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const statusToast = useToast();
  const params = useSearchParams();
  const redirectURL = params.get("redirect");

  useEffect(() => {
    if (redirectURL) {
      statusToast({
        title: "Sign in first",
        description: "Please sign in before proceeding",
        status: "info",
      });
    }
  }, [redirectURL, statusToast]);

  const redirect = () => {
    if (redirectURL) {
      // need full page reload to account for auth state change
      window.location.href = redirectURL;
    } else {
      // redirect home if no redirect url is specified
      window.location.href = "/";
    }
  };

  const submitForm = async ({ email, password }: FormParams) => {
    setLoading(true);

    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      statusToast({
        title: "Login failed",
        description: error.message,
        status: "error",
      });
    } else {
      statusToast({
        title: "Signed in",
        description: "You are now authenticated",
        status: "success",
      });

      authBroadcast.postMessage("reload-auth");

      redirect();
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
  });

  return (
    <>
      <Container maxW="container.xl" py={{ base: "32", lg: "20" }}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          px="4"
          alignItems="center"
          spacing="16"
        >
          <Box
            w="100%"
            h="100%"
            display={{ base: "none", lg: "block" }}
            position="relative"
          >
            <Img
              src="/static/images/windmill.jpg"
              alt="Windmill"
              borderRadius="lg"
              width="100%"
              h="2xl"
              objectFit="cover"
              filter="brightness(70%)"
            />
            <Heading
              as="h3"
              size="xl"
              position="absolute"
              zIndex="2"
              top="8"
              left="8"
              mr="20"
              color="white"
            >
              Back to join the fight for clean energy?
            </Heading>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <VStack
              align="flex-start"
              spacing="19"
              w={{ base: "100%", sm: "max-content" }}
              mx="auto"
            >
              <Heading as="h1" size="2xl">
                Login
              </Heading>
              <Subheader mt="-2" mb="1">
                Welcome Back
              </Subheader>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
                disabled={loading}
                w={{ base: "100%", sm: "sm" }}
                size="lg"
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                disabled={loading}
                w={{ base: "100%", sm: "sm" }}
                size="lg"
              />
              <Button
                mt="2"
                colorScheme="brand"
                type="submit"
                isLoading={loading}
                loadingText="Signing in..."
                size="lg"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Continue
              </Button>
            </VStack>
          </form>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Login;