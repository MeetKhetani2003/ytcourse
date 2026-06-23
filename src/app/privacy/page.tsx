import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";
import { businessConfig } from "@/config/businessConfig";

export const metadata = {
  title: `Privacy Policy | ${businessConfig.name}`,
  description: `Privacy policy and data protection guidelines for ${businessConfig.name}. Learn how we collect, process, and secure user information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" subtitle="Privacy Policy & Data Security">
      <div className="space-y-6 font-sans text-secondary-text">
        <p>
          At <strong>{businessConfig.name}</strong>, accessible from <a href={businessConfig.websiteUrl} className="text-accent hover:underline">{businessConfig.websiteUrl}</a>, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">1. Information We Collect</h2>
          <p>
            We only collect information about you that we need to provide you with access to our educational materials, process your orders, and communicate support updates. This includes:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-white/80">
            <li>
              <strong className="text-white">Account Details:</strong> Your name, email address, profile picture (from Google Auth), and enrollment logs.
            </li>
            <li>
              <strong className="text-white">Contact Information:</strong> Phone numbers and email addresses provided during payment checkout or support requests.
            </li>
            <li>
              <strong className="text-white">Payment Metadata:</strong> Transaction IDs, billing states/cities, and date/time of purchases. <em>Note: We do not store or process card numbers, banking passwords, or UPI PINs on our servers. All payments are securely routed and processed through our verified payment gateway (Razorpay).</em>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-white/80">
            <li>Provide, operate, and maintain our educational learning dashboard.</li>
            <li>Improve, personalize, and expand our courses and learning tools.</li>
            <li>Understand and analyze how students use our training materials to improve the curriculum.</li>
            <li>Process transactions and send purchase receipts and tax invoices via email.</li>
            <li>Provide student support, answer technical questions, and send alerts or updates.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">3. Cookies and Session Storage</h2>
          <p>
            We use secure cookies and local storage to keep you logged in to your student dashboard. We utilize NextAuth.js for session management. These cookies store cryptographically signed tokens containing your username and email address to grant authorized access to course video files. You can choose to disable cookies through your individual browser options, though this may restrict access to the logged-in course viewer area.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">4. Secure Payment Processing</h2>
          <p>
            Our payment transactions are handled through <strong>Razorpay</strong>, a secure third-party payment aggregator. When you pay for our course, your payment information (such as credit/debit card numbers, UPI IDs, netbanking credentials) is encrypted using industry-standard Secure Sockets Layer (SSL) technology. Razorpay adheres to the standards set by PCI-DSS (Payment Card Industry Data Security Standard) to ensure secure handling of credit card information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">5. Data Retention and Safety</h2>
          <p>
            We retain account credentials and enrollment progress logs for as long as your student account is active. We implement appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">6. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
