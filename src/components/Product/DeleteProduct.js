import React, { useState } from 'react'
import { storage, db } from '../../firebase.js'
import { ref } from "firebase/storage";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";

export default function DeleteProducts() {
  const [title, setTitle] = useState('');

  const [imageError, setImageError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteError, setDeleteError] = useState('');

  /* Process products */
  async function handleDeleteProducts(e) {
    e.preventDefault();
    /* find products */
    const Docsnapshot = await getDoc(doc(db, `Products`, `${title}`))
    if (Docsnapshot.exists()) {
      await deleteDoc(doc(db, `Products`, `${title}`)).then(() => {
        setSuccessMsg('Delete product successfully');
        setTitle('');
        setImageError('');
        setDeleteError('');
        setTimeout(() => {
          setSuccessMsg('');
        }, 3000)
      })
    } else {
      setDeleteError('Product does not exist ')
    }
  }

  return (
    <div className='container'>
      <br></br>
      <br></br>
      <h1>Add Products</h1>
      <hr></hr>
      {successMsg && <>
        <div className='success-msg'>{successMsg}</div>
        <br></br>
      </>}
      <form autoComplete="off" className='form-group' onSubmit={handleDeleteProducts}>
        <label>Product Title</label>
        <input type="text" className='form-control' required
          onChange={(e) => setTitle(e.target.value)} value={title}></input>

        <br></br>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className='btn btn-success btn-md'>
            DELETE
          </button>
        </div>
      </form>
      {deleteError && <>
        <br></br>
        <div className='error-msg'>{deleteError}</div>

      </>}

    </div>
  )
}