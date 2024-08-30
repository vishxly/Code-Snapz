"use client";

import Link from "next/link";
import React from "react";
import { ExternalLink } from "lucide-react";

function Footer() {
  return (
    <div className="flex items-center gap-10 py-16 dark:bg-black dark:text-white ">
      <Link
        className="text-sm font-medium flex gap-2 items-center   hover:text-slate-200 ease-in-out transition-all duration-150"
        href="https://twitter.com/vishxly"
      >
        Twitter <ExternalLink />
      </Link>
      <p className="text-sm font-medium flex gap-2 items-center">
        Made by Vyan
      </p>
      <Link
        className="text-sm font-medium flex gap-2 items-center   hover:text-slate-200 ease-in-out transition-all duration-150"
        href="https://github.com/vishxly/Code-Snapz"
      >
        Source code <ExternalLink />
      </Link>
    </div>
  );
}

export default Footer;
