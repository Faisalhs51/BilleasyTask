"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [menu, setMenu] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProducts(response.data);
    setFilteredProducts(response.data);
  };

  const fetchMenu = async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    setMenu(response.data);
  };

  const handleFiltering = (index) => {
    const filterdata = products.filter((item) => {
      return item.category === menu[index];
    });

    setFilteredProducts(filterdata);
  };

  useEffect(() => {
    fetchMenu();
    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="flex gap-5 w-full justify-center items-center">
          {menu.map((menu, idx) => {
            return (
              <>
                <button
                  className="p-4 bg-gray-600 rounded-md text-white text-xs lg:text-base"
                  key={idx}
                  onClick={() => handleFiltering(idx)}
                >
                  {menu}
                </button>
              </>
            );
          })}
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap gap-2 p-10 w-full items-center justify-between h-fit">
          {filteredProducts.map((items) => {
            return <ProductCard {...items} />;
          })}
        </div>
      </main>
    </>
  );
};

const ProductCard = (props) => {
  return (
    <>
      <div
        key={props.id}
        className="flex flex-col gap-2 border rounded-sm w-full  lg:w-[25%] h-[80vh] items-center p-4"
      >
        <Image
          src={`${props.image}`}
          width={100}
          height={100}
          alt={props.title}
        />
        <h3 className="text-lg font-medium text-center">{props.title}</h3>
        <p className="text-lg "> {props.price}</p>
        <p className="text-justify text-sm overflow-y-scroll">
          {props.description}
        </p>
      </div>
    </>
  );
};

export default HomePage;
