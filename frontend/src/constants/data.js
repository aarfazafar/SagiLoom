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
          id: "shop-by-occasion",
          name: "SHOP BY OCCASION",
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
          ],
        },
        {
          id: "shop-by-category",
          name: "SHOP BY CATEGORY",
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
          id: "shop-by-collection",
          name: "SHOP BY COLLECTION",
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
    { name: "NEW ARRIVALS", href: "#" },
    { name: "KIDS", href: "#" },
    { name: "TRENDING NOW", href: "#" },
    // { name: "TRACK ORDERS", href: "#" },
  ],
};
