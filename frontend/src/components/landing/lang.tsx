import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "id";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {} });

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
