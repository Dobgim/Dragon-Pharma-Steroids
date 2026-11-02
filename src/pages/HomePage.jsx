import React from 'react';
import BannerHero from '../components/BannerHero';
import ProfessionalFeatures from '../components/ProfessionalFeatures';
import WorkProcess from '../components/WorkProcess';
import OurSolutions from '../components/OurSolutions';
import OurPlans from '../components/OurPlans';
import FaqSection from '../components/FaqSection';
import VideoSection from '../components/VideoSection';
import FeedbackSection from '../components/FeedbackSection';
import WhyChooseUs from '../components/WhyChooseUs';
import LatestNews from '../components/LatestNews';
import SponsorSection from '../components/SponsorSection';
import CtaSection from '../components/CtaSection';

export default function HomePage() {
  return (
    <>
      <BannerHero />
      <ProfessionalFeatures />
      <WorkProcess />
      <OurSolutions />
      <OurPlans />
      <FaqSection />
      <VideoSection />
      <FeedbackSection />
      <WhyChooseUs />
      <LatestNews />
      <SponsorSection />
      <CtaSection />
    </>
  );
}
