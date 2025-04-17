import { Fragment, useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SearchBar from "../Search/Search";
import logoWBg from "../../assets/logo1.jpg";
import logo from "../../assets/logo2.png";
import { navigation } from "../../constants/data";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropDown";

export default function NavBar({ data }) {
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [hoveredPage, setHoveredPage] = useState(null);
  //get user from localstorage
  const [showSearch, setShowSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category, section, item, close) => {
    navigate(
      `/productpage/${category.id}/${section.id}/${item.name.toLowerCase()}`
    );
    close();
  };

  return (
    <div className="grotesk z-100 fixed top-0 w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-100 flex">
          <DialogPanel
            transition
            className="relative flex w-full h-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setScrolled(false);
                }}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-1">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <Link
                            to={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </Link>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          SHOP BY {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <p
                                // to={item.href}
                                // to={`/${category.id}/${section.id}/${item.id}`}
                                onClick={() =>
                                  handleCategoryClick(
                                    category,
                                    section,
                                    item,
                                    close
                                  )
                                }
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {user ? (
                <button className="flow-root" onClick={logout}>
                  <div className="-m-2 block p-2 font-medium text-gray-900">
                    Logout
                  </div>
                </button>
              ) : (
                <>
                  <div className="flow-root">
                    <Link
                      to={"/login"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/signup "}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header
        className={`w-full transition-all duration-600 ${
          scrolled ? "bg-[#fbf7f6] shadow-md" : "bg-transparent"
        }`}
      >
        {/* <p className="flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav
          aria-label="Top"
          className="z-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200/75">
            <div className="flex h-16 justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  setScrolled(true);
                }}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="flex">
                <Link to="/">
                  {/* <span className="sr-only">Your Company</span> */}
                  <img
                    alt="सगिLoom"
                    src={scrolled ? logoWBg : logo}
                    className="h-16 w-auto transition-all duration-600"
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div
                        className="relative flex"
                        // onHoverStart={() => setScrolled(true)}
                        // onHoverEnd={() => setScrolled(false)}
                      >
                        <PopoverButton
                          onClick={() => setScrolled(!scrolled)}
                          onMouseEnter={() => setHoveredPage(category.name)}
                          onMouseLeave={() => setHoveredPage(null)}
                          className={`relative z-10 -mb-px flex items-center border-b-2 border-transparent focus:border-none pt-px text-sm font-medium hover:scale-103 ${
                            scrolled
                              ? "text-gray-700 hover:text-gray-500 "
                              : "text-white hover:text-[#fbf7f6]"
                          } transition-colors duration-300 ease-out data-open:border-indigo-600 data-open:text-indigo-600`}
                        >
                          {category.name}
                          <span
                            style={{
                              transform:
                                hoveredPage === category.name
                                  ? "scaleX(1)"
                                  : "scaleX(0)",
                            }}
                            className={`absolute -bottom-1 -left-2 -right-2 h-1 origin-left rounded-full ${
                              open ? "bg-[#f5eee4]" : "bg-[#fbf7f6]"
                            } transition-transform duration-300 ease-out`}
                          />
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow-sm"
                        />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative uppercase sm:text-sm"
                                  >
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full shadow=md bg-gray-100 object-cover group-hover:opacity-85 group-hover:scale-98"
                                    />
                                    <Link
                                      to={item.href}
                                      className="mt-6 block font-medium text-xs text-gray-900"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 z-10"
                                      />
                                      {item.name}
                                    </Link>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="text-xs font-medium text-gray-900"
                                    >
                                      SHOP BY {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Link
                                            to={`/productpage/${category.id}/${
                                              section.id
                                            }/${item.name.toLowerCase()}`}
                                            className="tracking-wider hover:text-gray-800"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className={`flex relative items-center text-sm font-medium hover:scale-103 ${
                        scrolled
                          ? "text-gray-700 hover:text-gray-500"
                          : "text-white hover:text-[#fbf7f6]"
                      } transition-all duration-300 ease-out`}
                      onMouseEnter={() => setHoveredPage(page.name)}
                      onMouseLeave={() => setHoveredPage(null)}
                    >
                      {page.name}
                      <span
                        style={{
                          transform:
                            hoveredPage === page.name
                              ? "scaleX(1)"
                              : "scaleX(0)",
                        }}
                        className={`absolute -bottom-1 -left-2 -right-2 h-1 origin-left rounded-full ${
                          open ? "bg-[#f5eee4]" : "bg-[#fbf7f6]"
                        } transition-transform duration-300 ease-out`}
                      />
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div
                className={`flex items-center text-gray-500 ${
                  scrolled ? "lg:text-gray-500" : "lg:text-white"
                }`}
              >
                {/* Search */}
                <div className="flex lg:ml-6">
                  <button
                    type="button"
                    onClick={() => setShowSearch(true)}
                    className="p-2 rounded-full hover:ring-1 ring-[#fbf7f6]/70 transition"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </button>
                </div>
                <div className="flex lg:ml-6">
                  {/* <Link to={`${user? "/" : "/login"}`} className="p-2  hover:text-gray-500"> */}
                  <span className="sr-only">User</span>
                  {/* <UserIcon aria-hidden="true" className="size-6" /> */}
                  {/* </Link> */}
                  <UserDropdown user={user} logout={logout} />
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="#" className="group -m-2 flex items-center p-2 rounded-full hover:ring-1 ring-[#fbf7f6]/70 transition">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0"
                    />
                    {/* <span className="ml-2 text-sm font-medium group-hover:text-gray-800">
                      0
                    </span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed top-0 w-full bg-white z-50 flex items-center justify-center p-4">
          {/* SearchBar */}
          <SearchBar data={data} />

          {/* Close Button */}
          <div className="max-w-xl flex justify-end mb-4">
            <button
              className="text-gray-600 hover:text-black transition"
              onClick={() => setShowSearch(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
