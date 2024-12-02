import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Input,
  Textarea,
  FormLabel,
  Select,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { db, storage } from "../../../firebase/firebase"; // Adjust path as necessary
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase Storage functions

export default function EventPostPage() {
  const [eventDetails, setEventDetails] = useState({
    image: null, // Image file object
    title: "",
    location: "",
    description: "",
    time: "",
    date: "",
    ticketCategory: "Early Bird", // Default ticket category
    category: "", // Event category (e.g., Music, Sports, etc.)
    tickets: [
      { category: "Early Bird", price: "" },
      { category: "Regular", price: "" },
      { category: "VIP", price: "" },
      { category: "VVIP", price: "" },
    ], // Default ticket categories
  });

  const [loading, setLoading] = useState(false); // For tracking loading state while uploading
  const [progress, setProgress] = useState(0); // Track upload progress

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const inputBgColor = useColorModeValue("white", "gray.800");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const formLabelColor = useColorModeValue("gray.700", "gray.300");

  // Handle input change for fields like title, description, etc.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle change for ticket prices
  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...eventDetails.tickets];
    newTickets[index][name] = value;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      tickets: newTickets,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({ ...eventDetails, image: file });
    }
  };

  const handleSubmit = async () => {
    if (!eventDetails.title || !eventDetails.location || !eventDetails.date || !eventDetails.time) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true); // Start loading
      console.log("Starting event posting...");

      
      const eventCollectionRef = collection(db, "events");
      const docRef = await addDoc(eventCollectionRef, {
        title: eventDetails.title,
        location: eventDetails.location,
        description: eventDetails.description,
        time: eventDetails.time,
        date: eventDetails.date,
        ticketCategory: eventDetails.ticketCategory,
        category: eventDetails.category,
        tickets: eventDetails.tickets,
        imageUrl: "", 
        createdAt: new Date(),
      });

      console.log("Event added with ID:", docRef.id);

      
      let imageUrl = "";
      if (eventDetails.image) {
        console.log("Uploading image...");

        const imageRef = ref(storage, `events/${eventDetails.image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, eventDetails.image);

        // Monitor upload progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress); // Update progress state
            console.log(`Upload progress: ${progress}%`);
          },
          (error) => {
            console.error("Error uploading image:", error);
            alert(`Error uploading image: ${error.message}`);
          },
          async () => {
            // Once the upload is complete, get the image URL
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref());
            console.log("Image uploaded successfully:", imageUrl);

            // Step 3: Update the Firestore document with the image URL
            await updateDoc(doc(db, "events", docRef.id), {
              imageUrl: imageUrl, // Update with image URL
            });

            console.log("Image uploaded and Firestore updated!");
          }
        );

        // Wait for the image upload to complete
        await uploadTask;
        console.log("Image upload task completed");
      }

      alert("Event posted successfully!");
      setProgress(0); // Reset progress bar
      setEventDetails({
        image: null,
        title: "",
        location: "",
        description: "",
        time: "",
        date: "",
        ticketCategory: "Early Bird",
        category: "",
        tickets: [
          { category: "Early Bird", price: "" },
          { category: "Regular", price: "" },
          { category: "VIP", price: "" },
          { category: "VVIP", price: "" },
        ],
      });

    } catch (error) {
      console.error("Error posting event:", error);
      alert(`Error posting event: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading after completing
      console.log("Loading state set to false");
    }
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Grid mb="20px" templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: "20px", xl: "20px" }}>
        {/* Left Section: Input Form */}
        <Flex flexDirection="column">
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="24px">
            Post New Event
          </Text>

          {/* Event Fields */}
          <FormLabel htmlFor="image" color={formLabelColor}>
            Image
          </FormLabel>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            mb="20px"
            bg={inputBgColor}
            borderColor={inputBorderColor}
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Flex direction="column">
              <FormLabel htmlFor="title" color={formLabelColor}>
                Title
              </FormLabel>
              <Input
                id="title"
                name="title"
                value={eventDetails.title}
                onChange={handleInputChange}
                mb="20px"
                placeholder="Enter event title"
                bg={inputBgColor}
                borderColor={inputBorderColor}
              />
            </Flex>

            <Flex direction="column">
              <FormLabel htmlFor="location" color={formLabelColor}>
                Location
              </FormLabel>
              <Input
                id="location"
                name="location"
                value={eventDetails.location}
                onChange={handleInputChange}
                mb="20px"
                placeholder="Enter event location"
                bg={inputBgColor}
                borderColor={inputBorderColor}
              />
            </Flex>
          </SimpleGrid>

          <FormLabel htmlFor="description" color={formLabelColor}>
            Description
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            mb="20px"
            placeholder="Enter event description"
            bg={inputBgColor}
            borderColor={inputBorderColor}
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Flex direction="column">
              <FormLabel htmlFor="time" color={formLabelColor}>
                Time
              </FormLabel>
              <Input
                type="time"
                id="time"
                name="time"
                value={eventDetails.time}
                onChange={handleInputChange}
                mb="20px"
                bg={inputBgColor}
                borderColor={inputBorderColor}
              />
            </Flex>

            <Flex direction="column">
              <FormLabel htmlFor="date" color={formLabelColor}>
                Date
              </FormLabel>
              <Input
                type="date"
                id="date"
                name="date"
                value={eventDetails.date}
                onChange={handleInputChange}
                mb="20px"
                bg={inputBgColor}
                borderColor={inputBorderColor}
              />
            </Flex>
          </SimpleGrid>

          {/* Ticket Categories */}
          {eventDetails.tickets.map((ticket, index) => (
            <SimpleGrid columns={{ base: 1 }} spacing={5} key={index}>
              <Flex direction="column">
                <FormLabel htmlFor={`ticketCategory-${index}`} color={formLabelColor}>
                  {ticket.category} Ticket Price
                </FormLabel>
                <Input
                  id={`ticketCategory-${index}`}
                  name="price"
                  value={ticket.price}
                  onChange={(e) => handleTicketChange(index, e)}
                  mb="20px"
                  placeholder={`Enter ${ticket.category} ticket price`}
                  bg={inputBgColor}
                  borderColor={inputBorderColor}
                />
              </Flex>
            </SimpleGrid>
          ))}

          {/* Event Category Dropdown */}
          <FormLabel htmlFor="category" color={formLabelColor}>
            Event Category
          </FormLabel>
          <Select
            id="category"
            name="category"
            value={eventDetails.category}
            onChange={handleInputChange}
            mb="20px"
            bg={inputBgColor}
            borderColor={inputBorderColor}
          >
            <option value="">Select Event Category</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Comedy">Comedy</option>
            <option value="Business">Business</option>
          </Select>

          {/* Submit Button */}
          <Button
            colorScheme="teal"
            size="sm"
            onClick={handleSubmit}
            mt="20px"
            boxShadow={boxShadow}
            isLoading={loading} // Show loading spinner when uploading
          >
            Post Event
          </Button>

          {loading && <Text mt="20px">Uploading Image: {Math.round(progress)}%</Text>}
        </Flex>
      </Grid>
    </Box>
  );
}
