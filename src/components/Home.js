import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Products } from './Product/Product.js'
import { auth, db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";

export default function Home() {

  const [products, setProducts] = useState([]);

  /* get current user  */
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        setUser(user.displayName);
      }
      else {
        setUser(null);
      }
    }, [])
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);


  /* get products  */
  async function getProducts() {
    const products = await getDocs(collection(db, 'Products'));
    const productsArray = [];
    products.forEach((doc) => {

      productsArray.push({ ...doc.data() })
    })
    setProducts(productsArray);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <>
      <Navbar user={user} />
      <br></br>
      {products.length > 0 && (
        <div className='container-fluid'>
          <h1 className='text-center'>Products</h1>
          <div className='products-box'>
            <Products products={products} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className='container-fluid'>Please wait....</div>
      )}
    </>
  )
}