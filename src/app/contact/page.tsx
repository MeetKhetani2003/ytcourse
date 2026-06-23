import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";
import { businessConfig } from "@/config/businessConfig";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: `Contact Us | ${businessConfig.name}`,
  description: `Get in touch with ${businessConfig.name}. Find our business address, support phone number, support email, and contact options.`,
};

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" subtitle="Get in touch with support">
      <div className="space-y-10 font-sans text-secondary-text">
        <p>
          We are committed to providing the highest quality support for our students and prospective learners. If you have any inquiries regarding the <strong>{businessConfig.courseName}</strong>, billing, access issues, or registration details, please reach out to us using any of the channels below.
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="p-6 bg-secondary-bg/40 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-white font-display font-bold text-base">Email Us</h3>
            <p className="text-xs text-secondary-text">For support and account inquiries</p>
            <a
              href={`mailto:${businessConfig.email}`}
              className="text-white font-semibold text-sm hover:text-accent transition-colors truncate max-w-full"
            >
              {businessConfig.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-6 bg-secondary-bg/40 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-display font-bold text-base">Call / WhatsApp</h3>
            <p className="text-xs text-secondary-text">Support Helpline (Mon-Sat, 10am-7pm)</p>
            <a
              href={`tel:${businessConfig.phone.replace(/\s+/g, "")}`}
              className="text-white font-semibold text-sm hover:text-accent transition-colors"
            >
              {businessConfig.phone}
            </a>
          </div>

          {/* Address Card */}
          <div className="p-6 bg-secondary-bg/40 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-white font-display font-bold text-base">Registered Office</h3>
            <p className="text-xs text-secondary-text">Our physical mailing address</p>
            <span className="text-white text-xs font-semibold leading-relaxed">
              {businessConfig.address}
            </span>
          </div>
        </div>

        {/* Support Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4 border-t border-white/5">
          {/* Quick Contact Form (UI Presentation) */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-display font-bold text-white">Send Us a Message</h3>
            <p className="text-sm">
              Have a quick question or need help? Fill out this form and our support team will reply within 24-48 business hours.
            </p>

            <ContactForm />
          </div>

          {/* Quick Help Card */}
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-display font-bold text-white">Merchant Registration Details</h3>
            <div className="bg-secondary-bg/20 border border-white/5 p-6 rounded-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-white/50 block">Official Business Name (PAN/GST/Udyam):</span>
                <strong className="text-white font-display text-sm md:text-base">{businessConfig.name}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-white/50 block">Customer Support Representative:</span>
                <strong className="text-white text-sm">Amit K. (Head of Support)</strong>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-white/50 block">WhatsApp Support Channel:</span>
                <a
                  href={`https://wa.me/${businessConfig.phone.replace(/[^0-9]/g, "")}?text=Hi,%20I%20have%20a%20question%20about%20the%20Faceless%20YouTube%20Masterclass`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Chat directly with Amit</span>
                </a>
              </div>
            </div>

            <div className="p-5 bg-accent/5 border border-accent/10 rounded-2xl text-xs space-y-2">
              <h4 className="font-bold text-white">Payment & Billing Inquiries:</h4>
              <p>
                All purchases are processed securely. The billing statements on your card or net-banking will show the charge as <strong>{businessConfig.name}</strong> or <strong>Razorpay</strong>. If you experience payment failures or need invoice details, feel free to submit the contact form or email our help desk directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
