"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface HomeCradProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}
export const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCradProps) => {
  return (
    <div className={className} onClick={handleClick}>
      <div className="flex-center glassmorphism size-12 rounded-[12px]">
        <Image src={img} alt="" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold whitespace-nowrap">{title}</h1>
        <p className="text-lg font-normal whitespace-nowrap">{description}</p>
      </div>
    </div>
  );
};
