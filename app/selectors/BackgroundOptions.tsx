"use client";

import { backgrounds } from "@/lib/utils/util";
import React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import OutsideClickHandler from "react-outside-click-handler";

interface BackgroundProps {
  background: string;
  setBackground: (background: string) => void;
}

function BackgroundOptions({ background, setBackground }: BackgroundProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const toggleDrowdown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropDown(false)}>
      <div onClick={toggleDrowdown} className="bg-selector relative">
        <p className="py-[5px] text-sm font-medium">Background</p>
        <div className="dropdown-title w-[62px] ">
          <div
            className="rounded-full w-[20px] h-[20px]"
            style={{ background: background }}
          ></div>
          <ChevronDown />
        </div>
        {showDropDown && (
          <div className="dropdown-menu top-[64px] w-[62px] rounded-full flex flex-col gap-2">
            {backgrounds.map((bg, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleBackgroundChange(bg)}
                  className="w-[46px] h-[20px] rounded-full cursor-pointer"
                  style={{ background: bg }}
                ></div>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default BackgroundOptions;
