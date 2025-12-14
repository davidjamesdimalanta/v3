"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Nav() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav id="nav" className="fixed top-0 left-0 right-0 z-50 p-[20px] flex justify-between transition-all duration-300 w-full">
        <Link
        className="text-md text-600"
        href="/">
          <div className="flex gutter-xs hover:cursor-pointer hover:bd-active">
          <Image
            src="/assets/icon/shiny-logo.png"
            alt="logo"
            width={30}
            height={30}
          />
          <span>David Dimalanta</span>
          </div>

        </Link>
        <div className="flex items-center gutter-md text-base">
          <button onClick={scrollToProjects} className="hover:cursor-pointer">Works</button>
          <Link href="/contact">Contact</Link>
        </div>
    </nav>
  );
}

