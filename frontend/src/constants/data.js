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
import img1  from '../assets/image1.png'
import img2  from '../assets/image2.png'
export const navigation = {
  categories: [
    {
      id: "shop",
      level:1,
      name: "SHOP",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
          img2,
          imageAlt:
            "New Arrivals"
        },
        {
          name: "Trending",
          href: "#",
          imageSrc:
           img1,
          imageAlt:
           "Trendy"
        },
      ],
      sections: [
        {
          id: "occasion",
          name: "OCCASION",
          level:2,
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
          level:3,
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

import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
// import bg3 from '../assets/bg3.png'
import bg4 from '../assets/bg4.png'
import bg5 from '../assets/bg5.png'

const slides = [
  {
    image: bg1,
    title: "Elevate Your Style",
    subtitle: "Blend of timeless craftsmanship with contemporary style"
  },
  {
    image: bg2,
    title: "Luxury Redefined",
    subtitle: "Experience premium fashion with impeccable detailing"
  },
  {
    image: bg4,
    title: "Exclusivity in Every Thread",
    subtitle: "Stand out from the crowd"
  },
  {
    image: bg5,
    title: "Timeless Elegance",
    subtitle: "Classic pieces that never go out of style"
  }
];
import { Sparkles, Shield, Truck, Clock} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Each piece is crafted with exceptional attention to detail using the finest materials available."
  },
  {
    icon: Shield,
    title: "Guaranteed Authenticity",
    description: "Every item in our collection comes with a certificate of authenticity and a lifetime guarantee."
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description: "We deliver to over 180 countries with fast, reliable shipping and real-time tracking."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated customer service team is available around the clock to assist you."
  }
];
export {slides, features};