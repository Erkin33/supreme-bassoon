import HeroBanners from "@/components/heroBanners";
import Info from "@/components/info";
import Header from "@/components/header";
import GuaranteeSection from "@/components/GuaranteeSection";
import Believe from "@/components/believement";
import OurWorks from "@/components/ourworks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-[1140px] h-full flex flex-col mx-auto pt-[17px] ">
      <Header />
      {/* Обёртка сделана relative + overflow-visible — только это изменено */}
      <div className="relative overflow-visible bg-[#02A653]">
        <HeroBanners />
        <Info />
        <GuaranteeSection/>
        <Believe/>
        <OurWorks/>
      </div>
      <Footer/>
    </div>
  );
}
