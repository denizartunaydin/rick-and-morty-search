import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

export const useProgressContext = () => {
  const context = useContext(ProgressContext);

  if (!context) throw new Error("useProgressContext context must be use inside AuthProvider");

  return context;
};
