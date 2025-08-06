import React from "react";
import Image from "next/image";
function Hero() {
  return (
    <section className="bg-white lg:grid">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Design,
            <strong className="text-primary"> Customize </strong>& Get It
            Delivered
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Unleash your creativity and design a one-of-a-kind product
            effortlessly. With our intuitive interface, you have complete
            control to customize every detail right from your device, making it
            truly yours in just a few taps.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              href="#"
            >
              Start Designing
            </a>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="#"
            >
              Explore Products
            </a>
          </div>
        </div>

        <Image
          loading="lazy"
          src={"/hero.png"}
          alt="Hero Image"
          width={350}
          height={350}
          className="aspect-square"
        />
      </div>
    </section>
  );
}

export default Hero;
