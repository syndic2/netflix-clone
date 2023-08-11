import React, { useState, useCallback, useEffect } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

import AccountMenu from '../account-menu';
import MobileMenu from '../mobile-menu';
import NavbarItem from './navbar-item';

const TOP_OFFSET = 66;

const Navbar: React.FC = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false);
  const [isShowAccountMenu, setIsShowAccountMenu] = useState<boolean>(false);
  const [isShowBackground, setIsShowBackground] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > TOP_OFFSET) setIsShowBackground(true);
    else setIsShowBackground(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onToggleMobileMenu = useCallback(() => {
    setIsShowMobileMenu(prevState => !prevState);
  }, []);

  const onToggleAccountMenu = useCallback(() => {
    setIsShowAccountMenu(prevState => !prevState);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${isShowBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
      >
        {/* Left Content */}
        <img className="h-4 lg:h-7" src="/assets/images/logo.png" alt="Logo" />
        <div
          className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
          ">
          <NavbarItem label={'Home'} />
          <NavbarItem label={'Series'} />
          <NavbarItem label={'Films'} />
          <NavbarItem label={'New 6 Popular'} />
          <NavbarItem label={'My List'} />
          <NavbarItem label={'Browse by languages'} />
        </div>
        {/* Left Content */}

        {/* Mobile Menu  */}
        <div
          onClick={onToggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${isShowMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={isShowMobileMenu} />
        </div>
        {/* Mobile Menu */}

        {/* Right Content */}
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div onClick={onToggleAccountMenu} className="flex items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/assets/images/default-red.png" alt="" />
            </div>
            <BsChevronDown className={`text-white transition ${isShowAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu
              visible={isShowAccountMenu}
            />
          </div>
        </div>
        {/* Right Content */}
      </div>
    </nav>
  );
};

export default Navbar;
