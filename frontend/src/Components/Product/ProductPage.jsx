import { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Layout } from "../Layout/Layout";
import myContext from "../../context/myContext";
import Product from "./Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebaseConfig/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Loading } from "../Loader/Loading";
const sortOptions = [
  // { name: "Most Popular", href: "#", current: true },
  // { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "MEHENDI", href: "#" },
  { name: "HALDI", href: "#" },
  { name: "RECEPTION", href: "#" },
  { name: "SANGEET", href: "#" },
  { name: "WEDDING", href: "#" },
  { name: "FESTIVE", href: "#" },
  { name: "EID", href: "#" },
  { name: "CASUAL", href: "#" },
  { name: "DULHE KI TOLI", href: "#" },
  { name: "BOUGEE", href: "#" },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "cream", label: "Cream", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "grey", label: "Grey", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "fabric",
    name: "Fabric",
    options: [
      { value: "cotton", label: "Cotton", checked: false },
      { value: "cotton blend", label: "Cotton Blend", checked: false },
      { value: "linen", label: "Linen", checked: false },
      { value: "silk", label: "Silk", checked: false },
      { value: "polyester", label: "Polyester", checked: false },
      { value: "rayon", label: "Rayon", checked: false },
      { value: "viscose", label: "Viscose", checked: false },
      { value: "nylon", label: "Nylon", checked: false },
      // { value: "khadi", label: "Khadi", checked: false }
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      // { value: "xxl", label: "XXL", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const context = useContext(myContext);
  const { getAllProducts } = context;

  const { categoryId, sectionId, itemName } = useParams();
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(matchingProducts);
  const [activeFilters, setActiveFilters] = useState({
    color: [],
    category: [],
    size: [],
  });

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log("🧩 Params:", { categoryId, sectionId, itemName });
  // }, []);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      if (
        (!categoryId || categoryId.toLowerCase() === "") &&
        (!sectionId || sectionId.trim() === "") &&
        (!itemName || itemName.trim() === "")
      ) {
        setFilteredProducts(getAllProducts);
        setMatchingProducts(getAllProducts);
        setLoading(false);
        return;
      }

      if (categoryId.toLowerCase() !== "shop") {
        console.warn("Not a 'shop' category, skipping fetch.");
        setLoading(false);
        return;
      }

      if (sectionId?.toLowerCase() === "arrivals") {
        const newArrivals = getAllProducts
          .filter((product) => product.time)
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 20);

        setMatchingProducts(newArrivals);
        setFilteredProducts(newArrivals);
        setLoading(false);
        return;
      }

      try {
        const snapshot = await getDocs(collection(fireDB, "products"));
        const products = [];

        snapshot.forEach((doc) => {
          const data = doc.data();

          // 👇 Fix: if `itemName` is undefined, still allow section match
          const matched = data.productCategories?.some((cat) => {
            return Object.entries(cat).some(([key, value]) => {
              if (!itemName) {
                return key.toLowerCase() === sectionId.toLowerCase();
              }
              return (
                key.toLowerCase() === sectionId.toLowerCase() &&
                value.toLowerCase() === itemName.toLowerCase()
              );
            });
          });

          if (matched) {
            products.push({ id: doc.id, ...data });
          }
        });

        setMatchingProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // ✅ Always resolves loading
        return;
      }
    };

    fetchProducts();
  }, [categoryId, sectionId, itemName, getAllProducts]);

  // const location = useLocation();
  const navigate = useNavigate();
  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.get(sectionId)?.split(",") || [];

    if (filterValue.includes(value)) {
      // Remove the value
      filterValue = filterValue.filter((item) => item !== value);
    } else {
      // Add the value
      filterValue.push(value);
    }

    // Update or delete the param
    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    } else {
      searchParams.delete(sectionId);
    }

    navigate({ search: `?${searchParams.toString()}` });

    const newActiveFilters = {
      ...activeFilters,
      [sectionId]: filterValue,
    };
    setActiveFilters(newActiveFilters);

    // Apply filters to products
    const filtered = matchingProducts.filter((product) => {
      // If no filters are active, show all products
      const hasActiveFilters = Object.values(newActiveFilters).some(
        (filters) => filters.length > 0
      );
      if (!hasActiveFilters) return true;

      // Check if product matches all active filters
      return Object.entries(newActiveFilters).every(
        ([filterType, selectedValues]) => {
          if (selectedValues.length === 0) return true;

          switch (filterType) {
            case "color":
              // Check color in specification array
              return (
                selectedValues.length === 0 ||
                product.specification?.some(
                  (spec) =>
                    spec.Color &&
                    // spec.Color.toLowerCase() === selectedValues[0].toLowerCase()
                    selectedValues.includes(spec.Color.toLowerCase())
                )
              );

            case "fabric":
              return (
                selectedValues.length === 0 ||
                product.specification?.some(
                  (spec) =>
                    spec.Fabric &&
                    // spec.Fabric.toLowerCase() ===
                    // selectedValues[0].toLowerCase()
                    selectedValues.includes(spec.Fabric.toLowerCase())
                )
              );

            case "size":
              return (
                selectedValues.length === 0 ||
                product.sizes?.some((size) =>
                  selectedValues.includes(size.toLowerCase())
                )
              );

            default:
              return true;
          }
        }
      );
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(matchingProducts);
  }, [matchingProducts]);

  const sortProductsLowToHigh = (products) => {
    return [...products].sort((a, b) => a.price - b.price);
  };

  const sortProductsHighToLow = (products) => {
    return [...products].sort((a, b) => b.price - a.price);
  };

  const handleSort = (name) => {
    console.log("Sort clicked");
    
    if (name === "Price: Low to High") {
      const sortedL = sortProductsLowToHigh(filteredProducts);
      setFilteredProducts(sortedL);
    } else {
      const sortedH = sortProductsHighToLow(filteredProducts);
      setFilteredProducts(sortedH);
    }
  };

  // const handleSortHighToLow = () => {};

  return (
    <Layout>
      {loading && <Loading />}
      <div className="absolute top-0 bg-gradient-to-r from-[#e8d8c3]/20 via-[#e8d8c3] to-[#e1cbc1] w-full h-16"></div>
      <div className="w-full relative">
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-110 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mt-10 mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-20 pb-6">
            <h1 className="flex gap-2 playfair-display text-xs lg:text-xl tracking-wide text-gray-600">
              <span>{categoryId} /</span>
              <span>{sectionId ? sectionId : ""}</span>
              <span>{itemName ? "/ " + itemName : ""}</span>
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          // href={option.href}
                          onClick={() => handleSort(option.name)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="flex flex-col">
                <div className="hidden lg:flex mb-6 justify-between">
                  <h3 className="opacity-50">Filters</h3>
                  <FunnelIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </div>
                <form className="hidden lg:block">
                  {/* <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm tracking-wide font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    onChange={() => {
                                      handleFilter(option.value, section.id);
                                    }}
                                    defaultValue={option.value}
                                    // defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className=" flex-1 lg:col-span-3">
                {/* Your content */}
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center px-4 text-center text-[#5a4637] bg-[#e8d8c3]/20 rounded-xl shadow-md border border-[#e8d8c3] mx-auto h-100"
                  >
                    <Sparkles className="h-16 w-16 text-[#bba892] mb-3 lg:mb-6 animate-bounce-slow" />
                    <h2 className="text-3xl font-bold mb-5 grotesk">
                      Coming Soon!
                    </h2>
                    <p className="text-md grotesk text-[#5a4637]/80">
                      Oops! There’s no product matching this category right now.
                      <br />
                      Stay tuned, we’re adding more soon ✨
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-4">
                    {filteredProducts.map((product, index) => {
                      return (
                        <Product product={product} key={product.id || index} />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
