import React from "react";

const Product = ({product}) => {
  return (
    <div className="group relative">
      <img
        alt=""
        src={product.image}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="/">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-white">{product.price}</p>
      </div>
    </div>
  );
};

export default Product;
