import React, { useEffect } from "react";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import "./header.css";
import { Avatar, Dropdown, Space } from "antd";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/" },
  { name: "News", href: "/" },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  // const userLogin = localStorage.getItem("userLogin");
  // const currentUser = userLogin ? JSON.parse(userLogin) : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log(currentUser);

  const currentUser = useLocalStorage("userLogin");

  useEffect(() => {
    if (currentUser) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  const getFirstLetter = () => {
    if (currentUser && currentUser.hoTen) {
      return currentUser.hoTen.charAt(0).toUpperCase();
    }
    return "A";
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    window.location.reload();
  };
  const items = [
    {
      label: (
        <p onClick={handleLogout} className="text-red-600">
          Đăng xuất
        </p>
      ),
      key: "0",
    },
  ];
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 header">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-4 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <img
                src="https://i.imgur.com/lC22izJ.png"
                className="h-15 w-auto"
              ></img>
              <span className="text-white text-4xl font-bold">
                Cybersoft Movie
              </span>
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 ">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-semibold text-white text-2xl"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {currentUser ? (
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar
                      style={{ backgroundColor: "#f56a00", cursor: "pointer" }}
                      size={50}
                    >
                      {getFirstLetter()}
                    </Avatar>
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <NavLink
                to={"login"}
                className="text-2xl font-semibold text-white"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </NavLink>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
