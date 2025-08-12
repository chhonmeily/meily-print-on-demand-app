import Categories from "./_components/Categories";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import PopularProducts from "./_components/PopularProducts";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero />
      {/* Category List */}
      <Categories />

      {/* Product List */}
      <PopularProducts />
      {/* Footer */}

      <Footer />
    </div>
  );
}
