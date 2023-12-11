"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Product({ params }) {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${params.id}`
    );
    // console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col lg:flex-row w-full justify-between gap-2 items-center h-full p-5">
          <div className="flex items-center justify-center w-[50%] h-full">
            <Image
              src={data.image}
              height={250}
              width={200}
              alt={data.title}
              // className="w-[50%]"
            />
          </div>
          <div className="w-full lg:w-[50%] p-4 gap-4 h-full">
            <h3 className="text-3xl font-medium">{data.title}</h3>
            <p className="text-lg">&#8377; {data.price}</p>
            {/* <p className="text-md">{data.description}</p> */}
            {Array(Math.round(data.rating.rate))
              .fill(0)
              .map(() => {
                return (
                  <>
                    <span>*</span>
                  </>
                );
              })}
            <span>{data.rating.rate}</span>
          </div>
        </div>
      )}
    </>
  );
}
