import Categories from "./_components/Categories";
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
    </div>
  );
}
