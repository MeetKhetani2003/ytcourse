import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";
import { businessConfig } from "@/config/businessConfig";

export const metadata = {
  title: `Terms & Conditions | ${businessConfig.name}`,
  description: `Terms of service and user agreements for the ${businessConfig.courseName} training program by ${businessConfig.name}.`,
};

export default function TermsConditionsPage() {
  return (
    <InfoPageLayout title="Terms & Conditions" subtitle="User Terms of Service">
      <div className="space-y-6 font-sans text-secondary-text">
        <p>
          Welcome to <strong>{businessConfig.name}</strong>. These terms and conditions outline the rules and regulations for the use of our website and access to our educational training services.
        </p>
        <p>
          By accessing this website and enrolling in our courses, we assume you accept these terms and conditions in full. Do not continue to use our platform if you do not agree to all of the terms and conditions stated on this page.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">1. Terminology</h2>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Policy and Disclaimer Notice, and all Agreements: "Client", "User", "You", and "Your" refers to you, the person logging onto this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our", and "Us", refers to our brand <strong>{businessConfig.name}</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">2. User Account and Access</h2>
          <p>
            To access our course materials, you are required to log in securely using Google OAuth authentication. You agree that:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-white/80">
            <li>You will maintain the security of your logged-in credentials.</li>
            <li>Your course purchase grants you a single-user, non-transferable license to view the curriculum.</li>
            <li>Sharing account access, downloading course videos unlawfully, or redistributing course content is strictly prohibited and will lead to termination of course access without refund.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">3. Services & Pricing</h2>
          <p>
            We provide digital online courses, pre-recorded video tutorials, checklists, and templates (collectively referred to as the <strong>{businessConfig.courseName}</strong>). 
          </p>
          <p>
            The fee for course enrollment is stated clearly on our landing page and order checkout form (standard pricing of <strong>{businessConfig.coursePrice}</strong>, inclusive of transaction charges). Pricing is subject to change at the discretion of the Company, but already enrolled users will not be charged any recurring fees. All payments are processed securely through Razorpay.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">4. No Income, Crypto, or Investment Claims</h2>
          <p>
            Our training is strictly educational. We teach technical video editing, content planning, YouTube SEO, and analytical channel management skills. 
          </p>
          <p className="bg-secondary-bg/30 border border-white/5 p-4 rounded-xl text-white/90 font-medium">
            We do NOT guarantee that you will earn money, get rich, build a successful channel, or receive algorithmic placement on YouTube. We do NOT provide investment advice, financial planning, cryptocurrency tutorials, forex training, or gambling strategies. Any student results shown on our website are case studies of individual effort, and do not represent a guarantee of typical performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">5. Intellectual Property</h2>
          <p>
            Unless otherwise stated, <strong>{businessConfig.name}</strong> owns the intellectual property rights for all content, videos, scripts, designs, and text in the <strong>{businessConfig.courseName}</strong>. All intellectual property rights are reserved. You may access this from our website for your own personal educational use, subject to restrictions set in these terms and conditions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">6. Governing Law & Dispute Resolution</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms, including enrollment or billing issues, shall be subject to the exclusive jurisdiction of the courts located in Gautam Buddha Nagar (Noida), Uttar Pradesh, India.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms of service at any time. When we make updates, we will revise the "Last Updated" date at the top of the compliance page.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
