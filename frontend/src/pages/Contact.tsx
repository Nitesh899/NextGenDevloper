import ContactForm from "../components/contact/ContactForm";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";

const inquiryTypes = [
  {
    value: "GENERAL",
    label: "General Inquiry",
  },
  {
    value: "SERVICE",
    label: "Service Inquiry",
  },
  {
    value: "PROJECT",
    label: "Project Inquiry",
  },
  {
    value: "SUPPORT",
    label: "Technical Support",
  },
  {
    value: "PARTNERSHIP",
    label: "Partnership",
  },
  {
    value: "CAREER",
    label: "Career",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const priorities = [
  {
    value: "LOW",
    label: "Low",
  },
  {
    value: "NORMAL",
    label: "Normal",
  },
  {
    value: "HIGH",
    label: "High",
  },
  {
    value: "URGENT",
    label: "Urgent",
  },
];

export default function Contact() {
  return (
    <>
      <ContactHero />

      <ContactInfo />

      <ContactForm
        inquiryTypes={inquiryTypes}
        priorities={priorities}
      />
    </>
  );
}