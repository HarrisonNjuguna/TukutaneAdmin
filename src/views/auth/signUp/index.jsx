import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// Firebase imports (updated)
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAK9XdMGo9FaGEgYGti0b3Uy5te9h2vpIo",
    authDomain: "tukutaneadmin.firebaseapp.com",
    projectId: "tukutaneadmin",
    storageBucket: "tukutaneadmin.firebasestorage.app",
    messagingSenderId: "588527555848",
    appId: "1:588527555848:web:25b584413c350e8a5508bd",
    measurementId: "G-WG0TBT1B05"
  };

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app); // Get Firebase Auth instance
const db = getFirestore(app); // Get Firestore instance

function SignUp() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue({ bg: "gray.200" }, { bg: "whiteAlpha.300" });
  const googleActive = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.200" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update user profile with organizer name
      await updateProfile(user, { displayName: organizerName });
  
      // Add user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        organizerName,
        email,
        createdAt: new Date(),
      });
  
      // Successfully signed up - stop loading and redirect
      setIsLoading(false); // Ensure this is called before navigating
      navigate("/dashboard"); // Redirect to dashboard or home page after successful signup
  
    } catch (error) {
      setError(error.message);
      setIsLoading(false); // Make sure loading state is turned off even if an error occurs
    }
  };
  

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
            Create your account and get started!
          </Text>
        </Box>

        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign up with Google
          </Button>

          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">or</Text>
            <HSeparator />
          </Flex>

          <FormControl>
            {/* Organizer/Planner Input */}
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Organizer/Planner Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              value={organizerName}
              onChange={(e) => setOrganizerName(e.target.value)}
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              placeholder="Enter your organizer/planner name"
              mb="24px"
              fontWeight="500"
              size="lg"
            />

            {/* Email Input */}
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="youremail@gmail.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />

            {/* Password Input */}
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={showPassword ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handlePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>

            {/* Confirm Password Input */}
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired={true}
                fontSize="sm"
                placeholder="Confirm your password"
                mb="24px"
                size="lg"
                type={showConfirmPassword ? "text" : "password"}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={showConfirmPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleConfirmPasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>

            {/* Error message */}
            {error && (
              <Text color="red.500" mb="24px">
                {error}
              </Text>
            )}

            {/* Terms & Conditions Checkbox */}
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="terms-agree"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="terms-agree"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  I agree to the terms and conditions
                </FormLabel>
              </FormControl>
            </Flex>

            {/* Sign Up Button */}
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              isLoading={isLoading}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </FormControl>

          {/* Sign In Link */}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
