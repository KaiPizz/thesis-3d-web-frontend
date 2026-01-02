import PageHeader from "../components/about/PageHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactDetails from "../components/contact/ContactDetails";

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="If you'd like to reach out about the 3D showroom project, collaboration, or feedback, here are my contacts."
      />

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[2fr_1fr] gap-10">
          {/* Left Column: Contact Form */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <ContactForm />
          </section>

          {/* Right Column: Contact Details */}
          <aside>
            <ContactDetails />
          </aside>
        </div>
      </main>
    </>
  );
}

