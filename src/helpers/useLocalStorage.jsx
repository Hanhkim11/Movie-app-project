import React, { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  });
  useEffect(() => {
    const handleChangStorage = () => {
      const updateItem = localStorage.getItem(key);
      setValue (updateItem ? JSON.parse(updateItem):null)
    };
    window.addEventListener('storage', handleChangStorage),
    return () =>  window.removeEventListener('storage', handleChangeStorage);
  }, [key]);
  return value;
};

export default useLocalStorage;
