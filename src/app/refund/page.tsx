import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";
import { businessConfig } from "@/config/businessConfig";

export const metadata = {
  title: `Refund & Cancellation Policy | ${businessConfig.name}`,
  description: `Refund, cancellation, and transaction dispute policies for the ${businessConfig.courseName} by ${businessConfig.name}.`,
};

export default function RefundPolicyPage() {
  return (
    <InfoPageLayout title="Refund & Cancellation Policy" subtitle="Refunds, Returns & Cancellation">
      <div className="space-y-6 font-sans text-secondary-text">
        <p>
          At <strong>{businessConfig.name}</strong>, we strive to ensure our students have a rewarding experience while exploring and purchasing our digital training programs. As our service consists of online educational materials (digital video content, downloadable guides, and templates), we have established a clear policy for refunds and cancellations.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">1. Cancellation Policy</h2>
          <p>
            The <strong>{businessConfig.courseName}</strong> is a one-time fee enrollment program. 
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1 text-white/80">
            <li>There are no monthly subscriptions or recurring automated payments.</li>
            <li>Once you purchase the course, your license is active for lifetime access. Consequently, there are no ongoing cycles to cancel.</li>
            <li>If you decide to close your student account, you may request account deletion by emailing us at <a href={`mailto:${businessConfig.email}`} className="text-accent hover:underline">{businessConfig.email}</a>. Please note that deleting your account will revoke all course access and is non-reversible.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">2. No Refund Policy (All Sales Final)</h2>
          <p className="bg-secondary-bg/30 border border-white/5 p-4 rounded-xl text-white/95 leading-relaxed">
            <strong>Important notice:</strong> Due to the digital nature of the <strong>{businessConfig.courseName}</strong> (which provides immediate access to proprietary pre-recorded video tutorials, templates, checklists, and downloadable files upon payment validation), we enforce a strict <strong>No Refund / All Sales Final</strong> policy. 
          </p>
          <p>
            Once a transaction is processed, we do not offer returns, course exchanges, credits, or refunds under any circumstances (including user dissatisfaction, personal scheduling changes, or technical device incompatibility).
          </p>
          <p>
            We highly recommend reviewing the full course curriculum details, FAQ section, and video previews listed on our landing page before making a purchase. By making a payment on this website, you explicitly acknowledge and agree to this No Refund policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-display font-bold text-white">3. Accidental Duplicate Purchases</h2>
          <p>
            In the event that you are charged twice for the same course purchase due to a gateway lag, internet disconnection, or multiple payment click attempts:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-white/80">
            <li>Please contact us within 24 hours at <a href={`mailto:${businessConfig.email}`} className="text-accent hover:underline">{businessConfig.email}</a> with screenshots of both payment receipts and your registered email address.</li>
            <li>Upon verifying the duplicate payment record in our dashboard, we will cancel and issue a refund for the duplicate transaction back to your original payment method.</li>
            <li>Please allow **5 to 7 business days** for the duplicate refund to reflect in your bank account or card statement, as processed securely through Razorpay.</li>
          </ul>
        </section>
      </div>
    </InfoPageLayout>
  );
}
