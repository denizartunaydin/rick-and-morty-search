import { useEffect, useRef } from "react";
import { useProgressContext } from "../hooks/useProgressContext";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { setShowDropdown } = useProgressContext();

  const divRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: any) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={divRef} className="container mx-auto flex flex-col items-center p-6 gap-2">
      {children}
    </div>
  );
};

export default Layout;
