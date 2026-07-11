import { ContactPage } from "@/components/pages";
import { getContact } from "@/lib/content";

export default function ContactRoute() {
  return <ContactPage contact={getContact()} />;
}
