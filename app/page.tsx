"use client";

import { useRef, useState, useEffect } from "react";
import CodeArea from "@/app/selectors/CodeArea";
import { backgrounds, languages, themes } from "@/lib/utils/util";
import LanguageDropdown from "@/app/selectors/LanguageDropdown";
import ThemeOptions from "@/app/selectors/ThemeOptions";
import BackgroundOptions from "@/app/selectors/BackgroundOptions";
import PaddingAdjuster from "@/app/selectors/PaddingAdjuster";
import { Download, Sun, Moon } from "lucide-react";
import Footer from "@/app/selectors/Footer";
import html2canvas from "html2canvas";

export default function Home() {
  const [language, setLanguage] = useState(languages[0].name);
  const [icon, setIcon] = useState(languages[0].icon);
  const [theme, setTheme] = useState(themes[0]);
  const [background, setBackground] = useState(backgrounds[0]);
  const [paddings, setPaddings] = useState(["1rem", "2rem", "3rem", "4rem"]);
  const [currentPadding, setCurrentPadding] = useState(paddings[2]);
  const [code, setCode] = useState(languages[0].code);
  const [darkMode, setDarkMode] = useState(false);

  const editor = useRef(null);

  useEffect(() => {
    // Check for user's preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const exportPng = async () => {
    const editorPng = editor.current;

    if (editorPng) {
      const handleElems = document.querySelectorAll(".handle") as any;
      const cursorElem = document.querySelector(".ace_cursor") as any;
      const codetitle = document.querySelector(".code-title") as any;
      const codeEditor = document.querySelector(".ace_editor") as any;

      handleElems.forEach((elem: any) => {
        elem.style.display = "none";
      });
      cursorElem.style.display = "none";
      codetitle.style.boxShadow = "none";
      codeEditor.style.boxShadow = "none";

      const canvas = await html2canvas(editorPng);
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "codeSnap.png";
      link.href = image;

      link.click();

      handleElems.forEach((elem: any) => {
        elem.style.display = "block";
      });
      cursorElem.style.display = "block";
      codetitle.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
      codeEditor.style.boxShadow = "2px 3px 10px rgba(0, 0, 0, 0.2)";
    }
  };

  return (
    <main className="min-h-screen flex items-center flex-col justify-between bg-white dark:bg-black transition-colors duration-200 dark:text-white text-black">
      <header className="mt-6 w-[940px] p-5 fixed top-0 left-1/2 translate-x-[-50%] z-10 bg-gray-100 dark:bg-[#191919] rounded-xl border border-gray-300 dark:border-[#3c3c3c] shadow-md flex gap-6 transition-colors duration-200">
        <LanguageDropdown
          language={language}
          setLanguage={setLanguage}
          setIcon={setIcon}
          setCode={setCode}
        />
        <ThemeOptions theme={theme} setTheme={setTheme} />
        <BackgroundOptions
          background={background}
          setBackground={setBackground}
        />
        <PaddingAdjuster
          paddings={paddings}
          setCurrentPadding={setCurrentPadding}
          currentPadding={currentPadding}
        />

        <div className="export-button self-center ml-auto justify-center ">
          <button
            className="flex items-center gap-3 p-3 rounded-md text-sm text-[#ff6363] bg-[rgba(255,99,99,.15)] font-medium bg-opacity-10 hover:bg-[rgba(255,99,99,.35)] ease-in-out transition-all duration-200"
            onClick={exportPng}
          >
            <Download />
            Export PNG
          </button>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-black text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>
      <div className="code-editor mt-[10rem]" ref={editor}>
        <CodeArea
          language={language}
          icon={icon}
          theme={theme}
          code={code}
          onCodeChange={setCode}
          background={background}
          currentPadding={currentPadding}
        />
      </div>
      <Footer />
    </main>
  );
}
