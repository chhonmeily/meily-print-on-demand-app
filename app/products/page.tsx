import Categories from "../_components/Categories";
import Footer from "../_components/Footer";
import PopularProducts from "../_components/PopularProducts";

export default function Products() {
  return (
    <div>
      <header className="mt-20 mb-10">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Product Collection
        </h2>

        <p className="mt-4 max-w-md text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
          praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
          natus?
        </p>
      </header>
      <div className="mb-10">
        <PopularProducts />
      </div>

      <Categories />
      <Footer />
    </div>
  );
}
