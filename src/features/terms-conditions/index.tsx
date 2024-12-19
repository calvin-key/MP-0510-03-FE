const TermsAndConditions = () => {
  return (
    <main className="container mx-auto mt-10 space-y-5 px-5">
      <h1 className="text-3xl font-bold md:text-5xl">
        TICKET SALES TERMS AND CONDITIONS
      </h1>

      <div>
        <h2 className="text-xl font-bold">1. Introduction</h2>
        <p>
          Welcome to Scaena (the "Website"). By using this Website to purchase
          tickets, you agree to the following terms and conditions ("Terms").
          Please read them carefully before completing your transaction.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">2. Definitions</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            <strong>"Scaena," "we," "us," or "our":</strong> Refers to the
            operators of this Website.
          </li>
          <li>
            <strong>"User," "you," or "your":</strong> Refers to the person
            accessing or using the Website to purchase tickets.
          </li>
          <li>
            <strong>"Event Organizer":</strong> Refers to the third party
            responsible for organizing the event for which tickets are sold on
            our Website.
          </li>
          <li>
            <strong>"Tickets":</strong> Refers to the admission passes purchased
            through our Website.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">3. Use of the Website</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            You must be at least 18 years old to use this Website or obtain the
            consent of a legal guardian.
          </li>
          <li>
            You agree to provide accurate and complete information when
            purchasing tickets.
          </li>
          <li>
            The resale or transfer of tickets purchased through Scaena is
            prohibited unless explicitly allowed by the Event Organizer.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">4. Ticket Sales</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            All ticket sales are final. Refunds, exchanges, or cancellations are
            not permitted unless explicitly stated in the event details or
            required by applicable law.
          </li>
          <li>
            Tickets are subject to availability. We reserve the right to cancel
            or refuse any order for reasons including but not limited to errors
            in pricing or availability.
          </li>
          <li>
            Pricing and fees: The total cost of your purchase will include the
            ticket price and any applicable service fees, taxes, and delivery
            charges.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">5. Delivery of Tickets</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            Tickets may be delivered electronically or in physical form,
            depending on the event and the delivery method selected during the
            purchase process.
          </li>
          <li>
            It is your responsibility to ensure the accuracy of the delivery
            details provided. We are not responsible for tickets lost due to
            incorrect information.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">6. Event Details and Changes</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            Event dates, times, locations, and performers are subject to change.
            It is your responsibility to verify the event details before
            attending.
          </li>
          <li>
            In case of event cancellation or rescheduling, we will make
            reasonable efforts to notify you using the contact information
            provided during purchase. Refunds or exchanges in such cases will be
            handled in accordance with the Event Organizer's policies.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">7. Limitations of Liability</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            Scaena acts solely as a ticketing platform and is not responsible
            for the organization, quality, or safety of events.
          </li>
          <li>
            We are not liable for any direct, indirect, incidental, or
            consequential damages arising from your use of the Website or
            attendance at events.
          </li>
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-bold">8. User Conduct</h1>
        <ul className="list-inside list-disc pl-4">
          <li>
            You agree not to engage in fraudulent activities or violate any
            applicable laws while using the Website.
          </li>
          <li>
            Any misuse of the Website may result in termination of your access
            without notice.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">9. Intellectual Property</h2>
        <p>
          All content, trademarks, and intellectual property on this Website are
          owned by or licensed to Scaena. Unauthorized use is prohibited.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">10. Privacy Policy</h2>
        <p>
          Your personal information is collected, stored, and processed in
          accordance with our Privacy Policy, which is available on our Website.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">11. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction]. Any disputes shall be resolved exclusively in
          the courts of [Your Jurisdiction].
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold">12. Changes to These Terms</h2>
        <ul className="list-inside list-disc pl-4">
          <li>
            We reserve the right to modify these Terms at any time. Changes will
            take effect immediately upon posting on the Website.
          </li>
          <li>
            Continued use of the Website after any changes constitutes your
            acceptance of the revised Terms.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">13. Contact Us</h2>
        <p>
          For any questions or concerns about these Terms, please contact us at
          [Your Contact Information].
        </p>
      </div>

      <p className="w-full bg-orange-300 px-2 py-7 text-center">
        <strong>
          By purchasing tickets on Scaena, you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions.
        </strong>
      </p>
    </main>
  );
};

export default TermsAndConditions;
