import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Logo from "../../assets/navlogo.svg";
import "./Help.css";

const Help = () => {
  const qna = [
    {
      question: "What services are offered on the platform?",
      answer:
        "Our platform offers a wide range of legal services, including but not limited to legal consultations, document reviews, case representation, and legal advice.",
    },
    {
      question: "How do I register on the platform?",
      answer:
        "To register, click on the 'Sign Up' button, provide your details, and follow the instructions. Make sure to verify your email to complete the registration process.",
    },
    {
      question: "Can I use the platform on my mobile device?",
      answer:
        "Yes, our platform is designed to be mobile-friendly. You can access it through a web browser on your smartphone or tablet.",
    },
    {
      question: "Is there a cost for using the platform?",
      answer:
        "Registration is free. However, there may be charges for specific legal services. The cost details are provided by individual legal service providers.",
    },
    {
      question: "How can I search for a legal service provider?",
      answer:
        "Use our search feature to input your requirements, such as legal expertise, location, or language. The platform will then display relevant legal service providers.",
    },
    {
      question: "Can I see reviews and ratings of legal service providers?",
      answer:
        "Yes, you can view reviews and ratings provided by other users for each legal service provider. This information helps you make informed decisions.",
    },
    {
      question: "How do I pay for legal services on the platform?",
      answer:
        "Payments are typically handled through our secure payment gateway. Select the desired service, proceed to payment, and follow the instructions to complete the transaction.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we prioritize the security of your payment information. Our platform uses industry-standard encryption to protect your financial data.",
    },
    {
      question: "How do I open a legal case on the platform?",
      answer:
        "Navigate to the 'Cases' section, click on 'Open New Case,' and fill in the required details. You can then connect with a legal service provider to discuss your case.",
    },
    {
      question: "Can I track the progress of my legal case?",
      answer:
        "Yes, our platform provides a case management system where you can track updates, communicate with your legal service provider, and monitor the status of your case.",
    },
    {
      question:
        "What should I do if I encounter issues with a legal service provider?",
      answer:
        "Contact our helpline by submitting a request. Our support team will assist you in resolving any issues and ensuring a positive experience on the platform.",
    },
    {
      question:
        "How can I provide feedback about my experience on the platform?",
      answer:
        "We welcome your feedback! You can share your thoughts by navigating to the 'Feedback' section and submitting your review.",
    },
  ];

  return (
    <Flex className="help" direction="column" align="center" justify="center">
      <Flex
        direction="column"
        gap="20px"
        align="center"
        justify="center"
        padding="50px"
        width="50%"
      >
        <Image
          cursor="pointer"
          onClick={() => (window.location.href = "/")}
          src={Logo}
        />
        <Heading>
          Frequently Asked <br />
          <span className="text">Questions</span>{" "}
        </Heading>
        <Text>Need Help?</Text>
        <Accordion variant="bordered">
          {qna.map((item, index) => (
            <AccordionItem key={index} title={item.question}>
              <Box padding="10px">{item.answer}</Box>
            </AccordionItem>
          ))}
        </Accordion>

        <Text>
          Still have questions? <span className="link"> Contact Us</span>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Help;
