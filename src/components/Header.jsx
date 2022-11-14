import React, { useRef, useEffect, useState } from "react";
import axios from "axios" 
import { Container,Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button} from "reactstrap";
import logo from "./../assets/images/res-logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggle } from "../store/Slices/cartUiSlice";

import "./../styles/header.css";
import { isLogout, isUserData } from "../store/Slices/UserSlices";


const nav__links = [
  
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state?.cart?.totalQuantity);
  const login = useSelector((state) => state?.user?.login);
  const id = useSelector((state) => state?.user?.userData?.id);
  const admin = useSelector((state) => state?.user?.userData?.admin);
  const dispatch = useDispatch();


  const toggleMenu = () => menuRef?.current?.classList?.toggle("show__menu");

  const navigate = useNavigate()

  const toggleCart = () => {
    dispatch(toggle());
  
  };
  const [ open, setOpen ] = useState(false)

  const handleLogout = () =>{
    dispatch(isLogout());
    dispatch(isUserData({}));
    navigate("/")
  }
 
  useEffect(() => {
    window?.addEventListener("scroll", () => {
      if (
        document?.body?.scrollTop > 80 ||
        document?.documentElement?.scrollTop > 80
      ) {
        headerRef?.current?.classList?.add("header__shrink");
      } else {
        headerRef?.current?.classList?.remove("header__shrink");
      }
    });

   // return () => window?.removeEventListener("scroll");
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <Link to="/home" className="logo">
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </Link>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links?.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </Link>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {login ? 
            
            <Dropdown className="" isOpen={open} toggle={() => setOpen(!open)}>
            <DropdownToggle caret>
            <i class="ri-user-line"/>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem><Link to={`/update/${id !== "" && id}`}>Update</Link></DropdownItem>
              <DropdownItem><Link to={`/delete/${id !== "" && id}`}>Delete Account</Link></DropdownItem>

              {
                admin == true &&
                
                <>
                <DropdownItem><Link to={`/category/${id}`}>Create category</Link></DropdownItem>
                <DropdownItem><Link to={`/food/${id}`}>Upload Food</Link></DropdownItem>
                </>
              }
              <div className="text-center">
              <Button className="btn btn-danger" onClick={handleLogout}>Logout</Button>
              </div>
            </DropdownMenu>
         </Dropdown>

            :

            <span className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
            </span>
            }

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
