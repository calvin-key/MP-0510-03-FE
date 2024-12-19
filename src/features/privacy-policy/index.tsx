const PrivacyPolicy = () => {
  return (
    <main className="container mx-auto mt-10 space-y-5 px-5">
      <h1 className="text-3xl font-bold md:text-5xl">
        Privacy Policy for Scaena
      </h1>

      <div>
        <h2 className="text-xl font-bold">1. Introduction</h2>
        <p>
          At Scaena, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard your personal
          information when you use our website (the \"Website\") to purchase
          tickets or interact with us.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">2. Information We Collect</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            <strong>Personal Information:</strong> This includes your name,
            email address, phone number, billing information, and any other
            details you provide during ticket purchases or account creation.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            our Website, such as IP address, browser type, and browsing
            activity.
          </li>
          <li>
            <strong>Cookies:</strong> Small files stored on your device to
            enhance your user experience and for analytics purposes.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">3. How We Use Your Information</h2>
        <ul className="list-inside list-disc pl-4">
          <li>To process and fulfill your ticket orders.</li>
          <li>
            To communicate with you regarding your purchases, upcoming events,
            or customer support inquiries.
          </li>
          <li>To improve the functionality and performance of our Website.</li>
          <li>
            To send marketing communications, if you have opted in to receive
            them.
          </li>
          <li>
            To comply with legal obligations or enforce our Terms and
            Conditions.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">4. Sharing Your Information</h2>
        <p>
          We do not sell your personal information to third parties. However, we
          may share your information with:
        </p>
        <ul className="list-inside list-disc pl-4">
          <li>
            <strong>Event Organizers:</strong> To facilitate ticket delivery and
            event management.
          </li>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who assist
            us with payment processing, analytics, or email communications.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required to comply with
            applicable laws or respond to legal requests.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          disclosure, alteration, or destruction. However, no method of
          transmission over the Internet is 100% secure.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">6. Your Rights</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            You have the right to access, update, or delete your personal
            information stored with us.
          </li>
          <li>You may opt out of marketing communications at any time.</li>
          <li>
            If you are a resident of certain jurisdictions, you may have
            additional rights under applicable data protection laws.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">7. Third-Party Links</h2>
        <p>
          Our Website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these external
          sites. Please review their privacy policies independently.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">8. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time.
          Changes will take effect immediately upon posting on this Website. We
          encourage you to review this page periodically for updates.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at [Your Contact Information].
        </p>
      </div>

      <p className="w-full bg-orange-300 px-2 py-7 text-center">
        <strong>
          By using Scaena, you acknowledge that you have read, understood, and
          agreed to this Privacy Policy.
        </strong>
      </p>
    </main>
  );
};

export default PrivacyPolicy;
