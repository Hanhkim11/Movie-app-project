import { useEffect, useState } from 'react';

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const updateValue = () => {
      try {
        const newValue = localStorage.getItem(key);
        setValue(newValue ? JSON.parse(newValue) : null);
      } catch (e) {
        setValue(null);
      }
    };

    window.addEventListener("local-storage-change", updateValue);

    return () => {
      window.removeEventListener("local-storage-change", updateValue);
    };
  }, [key]);

  return value;
};

export default useLocalStorage;
