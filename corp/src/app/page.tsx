import Hero from "@/components/Hero";
import homeImg from '../../public/home.jpg'

export default function Home() {
  return (
   <Hero imgData={homeImg} imgAlt="Car Factory" title="Professional Cloud Hosting"></Hero>
  );
}
