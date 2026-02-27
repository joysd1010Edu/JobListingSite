//=== Imports ===
import React from "react";
import Hero from "./Hero";
import CompaniesStrip from "./CompaniesStrip";
import ExploreCategories from "./ExploreCategories";
import StartPosting from "./StartPosting";
import FeaturedJobs from "./FeaturedJobs";
import LatestJobs from "./LatestJobs";

//=== HomePage Component ===
const HomePage = () => {
  return (
    <main>
      {/* === Hero Section === */}
      <Hero />

      {/* === Companies We Helped Grow Section === */}
      <CompaniesStrip />

      {/* === Explore By Category Section === */}
      <ExploreCategories />

      {/* === Start Posting Jobs CTA Section === */}
      <StartPosting />

      {/* === Featured Jobs Grid (Desktop Only) === */}
      <FeaturedJobs />

      {/* === Latest Jobs List (Mobile Only) === */}
      <LatestJobs />
    </main>
  );
};

export default HomePage;
