import React, { useContext } from 'react'
import classes from './Header.module.css';
import {Link} from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase' 

const Header=()=> {
  const[{user,basket},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount +amount},0
  )
  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <CiLocationOn className={classes.location} />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            <BsSearch />
          </div>
          {/* other */}
          <div className={classes.order_container}>
            <a href="#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="United States flag"
              />
              <section>
                <option value="">EN</option>
              </section>
            </a>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header
