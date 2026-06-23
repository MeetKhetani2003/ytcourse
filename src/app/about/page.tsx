import React from "react";
import InfoPageLayout from "@/components/InfoPageLayout";
import { businessConfig } from "@/config/businessConfig";

export const metadata = {
  title: `About Us | ${businessConfig.name}`,
  description: `Learn about our educational platform, mission, and the digital creation skills taught in the ${businessConfig.courseName} program.`,
};

export default function AboutUsPage() {
  return (
    <InfoPageLayout title="About Us">
      <div className="space-y-8 font-sans text-secondary-text">
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Who We Are</h2>
          <p>
            Welcome to the online home of <strong>{businessConfig.name}</strong>. We are a premier digital education platform dedicated to empowering aspiring content creators, editors, and digital marketers around the world.
          </p>
          <p>
            Our core mission is to bridge the gap between technical execution and creative content strategy. We believe that with the right guidance, high-quality resources, and structured learning, anyone can master the art of video creation, digital storytelling, and search engine optimization.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Our Services & What We Do</h2>
          <p>
            We specialize in providing high-quality, comprehensive online educational programs, training tutorials, and digital resources. Our flagship product is the <strong>{businessConfig.courseName}</strong>, a step-by-step curriculum designed to teach the fundamentals of:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2 text-white/80">
            <li>
              <strong className="text-white">Content Planning & Research:</strong> Identifying target audience demographics, high-interest niches, and scripting principles.
            </li>
            <li>
              <strong className="text-white">Video Production & Editing:</strong> Hands-on workflows using industry-standard editing software, asset selection, and audio production.
            </li>
            <li>
              <strong className="text-white">YouTube SEO & Metadata Optimization:</strong> Structuring titles, descriptions, tags, and thumbnails to improve organic search discoverability.
            </li>
            <li>
              <strong className="text-white">Channel Analytics & Growth:</strong> Reading click-through rates, audience retention charts, and refining content strategies based on data.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Strict Educational Policy</h2>
          <p>
            Please note that <strong>{businessConfig.name}</strong> operates strictly as an educational and training platform. 
          </p>
          <p className="bg-secondary-bg/30 border border-white/5 p-4 rounded-xl text-white/90">
            <strong>Disclaimer:</strong> We do not offer financial advice, investment advisory services, "get rich quick" schemes, or guarantees of income. We have absolutely no involvement with trading, forex, cryptocurrency, gambling, or business opportunities that claim to generate passive wealth. Success in content creation relies entirely on a student's own efforts, consistent learning, practice, application, and adherence to platform policies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white">Get in Touch</h2>
          <p>
            If you have any questions about our curriculum, study materials, or would like to learn more about our student community, please visit our <a href="/contact" className="text-accent hover:underline">Contact Us</a> page or email us at <a href={`mailto:${businessConfig.email}`} className="text-accent hover:underline">{businessConfig.email}</a>.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
