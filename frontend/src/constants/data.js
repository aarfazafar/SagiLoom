// const navigation = {
//   categories: [
//     {
//       name: 'SHOP BY OCCASION',
//       items: [
//         { name: 'MEHENDI', href: '#' },
//         { name: 'HALDI', href: '#' },
//         { name: 'RECEPTION', href: '#' },
//         { name: 'SANGEET', href: '#' },
//         { name: 'WEDDING', href: '#' },
//         { name: 'FESTIVE', href: '#' },
//         { name: 'EID', href: '#' },
//       ],
//     },
//     {
//       name: 'SHOP BY CATEGORY',
//       items: [
//         { name: 'INDOWESTERN SETS', href: '#' },
//         { name: 'JACKET AND JACKET SET', href: '#' },
//         { name: 'KURTA AND KURTA SETS', href: '#' },
//         { name: "SHORT KURTA'S", href: '#' },
//       ],
//     },
//     {
//       name: 'SHOP BY COLLECTION',
//       items: [
//         { name: 'DULHE KI TOLI', href: '#' },
//         { name: 'BOUGEE', href: '#' },
//       ],
//     },
//   ],
//   pages: [
//     { name: 'NEW ARRIVALS', href: '#' },
//     { name: 'KIDS', href: '#' },
//     { name: 'TRENDING NOW', href: '#' },
//     { name: 'TRACK ORDERS', href: '#' },
//   ],
// }
export const navigation = {
  categories: [
    {
      id: "shop",
      name: "SHOP",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "occasion",
          name: "OCCASION",
          featured: [
            {
              name: "MEHENDI",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for Mehendi category.",
            },
            {
              name: "HALDI",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for Haldi category.",
            },
          ],
          items: [
            { name: "MEHENDI", href: "#" },
            { name: "HALDI", href: "#" },
            { name: "RECEPTION", href: "#" },
            { name: "SANGEET", href: "#" },
            { name: "WEDDING", href: "#" },
            { name: "FESTIVE", href: "#" },
            { name: "EID", href: "#" },
            { name: "CASUAL", href: "#" },
          ],
        },
        {
          id: "category",
          name: "CATEGORY",
          featured: [
            {
              name: "INDOWESTERN SETS",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for IndoWestern Sets.",
            },
            {
              name: "JACKET AND JACKET SET",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for Jacket and Jacket Set.",
            },
          ],
          items: [
            { name: "INDOWESTERN SETS", href: "#" },
            { name: "JACKET AND JACKET SET", href: "#" },
            { name: "KURTA AND KURTA SETS", href: "#" },
            { name: "SHORT KURTA'S", href: "#" },
          ],
        },
        {
          id: "collection",
          name: "COLLECTION",
          featured: [
            {
              name: "DULHE KI TOLI",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for Dulhe Ki Toli.",
            },
            {
              name: "BOUGEE",
              href: "#",
              imageSrc: "https://dummyimage.com/300",
              imageAlt: "Placeholder image for Bougee.",
            },
          ],
          items: [
            { name: "DULHE KI TOLI", href: "#" },
            { name: "BOUGEE", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "NEW ARRIVALS", href: "/arrivals" },
    // { name: "KIDS", href: "#" },
    { name: "TRENDING NOW", href: "#" },
    { name: "VISION", href: "/about" },
    // { name: "TRACK ORDERS", href: "#" },
  ],
};

// const categories = [
//   {1: ["OCCASION", "CATEGORY", "COLLECTION"]},
//   {2: ["MEHENDI", "HALDI", "RECEPTION", "SANGEET", "WEDDING", "FESTIVE", "EID"]},
//   {3: ["INDOWESTERN SETS", "JACKET AND JACKET SET", "KURTA AND KURTA SETS", "SHORT KURTA'S"]},
//   {4: ["DULHE KI TOLI", "BOUGEE", "OTHER"]}
// ]

const categories = [];
const sections = navigation.categories[0].sections;

categories.push({1: sections.map(section=>section.name)})

sections.forEach((section, index) => {
  categories.push({ [index + 2]: section.items.map(item => item.name) });
});
categories[3][4].push("CLASSIC")
categories[3][4].push("OTHER")

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
export {categories, sizes};