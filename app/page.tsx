import { Hero } from "@/components/home/Hero";
import { StartHere } from "@/components/home/StartHere";
import { LatestPosts } from "@/components/home/LatestPosts";
import { SeriesGrid } from "@/components/home/SeriesGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export default function Home() {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <StartHere />
      <LatestPosts />
      <SeriesGrid />
      <FeaturedProjects />
    </div>
  );
}
