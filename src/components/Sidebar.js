import React, { useEffect, useRef, useContext } from "react";
import { TodoContext } from "../context";

function Sidebar({ children }) {
  const { setSelectedTodo } = useContext(TodoContext);

  const sidebarRef = useRef();

   // eslint-disable-next-line
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
     // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };
  return (
    <div className="Sidebar" ref={sidebarRef}>
      {children}
    </div>
  );
}

export default Sidebar;
