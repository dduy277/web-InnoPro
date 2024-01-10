import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Products } from './Product/Product.js'
import { auth, db } from '../firebase'
import { collection, getDocs } from "firebase/firestore";
export default function Home() {

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          /* db.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().FullName);
          }) */
          setUser('yes');
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
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