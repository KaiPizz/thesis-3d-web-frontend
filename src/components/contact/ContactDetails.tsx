interface ContactMethod {
  label: string;
  value: string;
  href?: string;
}

const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "giaminh.cic@gmail.com",
    href: "mailto:giaminh.cic@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gia-minh-han/",
    href: "https://www.linkedin.com/in/gia-minh-han/",
  },
  {
    label: "GitHub",
    value: "github.com/KaiPizz",
    href: "https://github.com/KaiPizz",
  },
];

export default function ContactDetails() {
  return (
    <div className="bg-muted/40 border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

      <p className="text-sm text-muted-foreground mb-6">
        Whether you have questions about the 3D showroom implementation,
        potential collaboration opportunities, or feedback on the project, feel
        free to get in touch through any of the channels below.
      </p>

      <ul className="space-y-4">
        {contactMethods.map((method) => (
          <li key={method.label}>
            <span className="block text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
              {method.label}
            </span>
            {method.href ? (
              <a
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline break-all"
              >
                {method.value}
              </a>
            ) : (
              <span className="text-sm font-medium break-all">
                {method.value}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Response time is typically within 1–2 business days.
        </p>
      </div>
    </div>
  );
}
