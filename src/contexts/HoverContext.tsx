import { createContext, useContext } from "react";

export const HoverContext = createContext<number | null>(null);
export const useHoverContext = () => useContext(HoverContext);
