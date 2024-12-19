import Image from "next/image";
import Carousel from "./Carousel";

const HeroSection = () => {
  return (
    <section className="relative mx-auto md:h-[300px] w-full">
      <div className="absolute left-0 top-0 hidden h-full w-full md:block">
        <div className="relative h-3/4 bg-orange-500">
          <Image
            src="/background-1.webp"
            alt="Background Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#f9741640]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>
      </div>
      <Carousel />
    </section>
  );
};

export default HeroSection;
