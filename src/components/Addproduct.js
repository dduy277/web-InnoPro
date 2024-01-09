import React, { useState } from 'react'
import { storage, db } from '../firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

export default function AddProducts() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [image, setImage] = useState(null);

	const [imageError, setImageError] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [uploadError, setUploadError] = useState('');

	/* Process img */
	const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
	const handleProductImg = (e) => {
		let selectedFile = e.target.files[0];
		if (selectedFile) {
			if (selectedFile && types.includes(selectedFile.type)) {
				setImage(selectedFile);
				setImageError('');
			}
			else {
				setImage(null);
				setImageError('please select a valid image file type (png or jpg)')
			}
		}
		else {
			console.log('please select your file');
		}
	}

	/* Process products */
	async function handleAddProducts(e) {
		e.preventDefault();

		/* upload img to storage */
		const product_img = ref(storage, `product-images/${image.name}`);
		const uploadTask = uploadBytesResumable(product_img, image)
		uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 /* có thể thêm thanh loading bằng cái progress */
			console.log(progress);
		},
			error => { setUploadError(error.message) },
			() => {
				/* upload product to database */
				getDownloadURL(product_img).then(async url => {
					const docData = {
						title,
						description,
						price: Number(price),
						url
					}
					const docRef = await setDoc(doc(db, `Products`, `${title}`), docData).then(() => {
						setSuccessMsg('Product added successfully');
						setTitle('');
						setDescription('');
						setPrice('');
						document.getElementById('file').value = '';
						setImageError('');
						setUploadError('');
						setTimeout(() => {
							setSuccessMsg('');
						}, 3000)
					}).catch(error => setUploadError(error.message));
				})
			})
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
			<form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
				<label>Product Title</label>
				<input type="text" className='form-control' required
					onChange={(e) => setTitle(e.target.value)} value={title}></input>
				<br></br>
				<label>Product Description</label>
				<input type="text" className='form-control' required
					onChange={(e) => setDescription(e.target.value)} value={description}></input>
				<br></br>
				<label>Product Price</label>
				<input type="number" className='form-control' required
					onChange={(e) => setPrice(e.target.value)} value={price}></input>
				<br></br>
				<label>Upload Product Image</label>
				<input type="file" id="file" className='form-control' required
					onChange={handleProductImg}></input>

				{imageError && <>
					<br></br>
					<div className='error-msg'>{imageError}</div>

				</>}
				<br></br>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<button type="submit" className='btn btn-success btn-md'>
						SUBMIT
					</button>
				</div>
			</form>
			{uploadError && <>
				<br></br>
				<div className='error-msg'>{uploadError}</div>

			</>}

		</div>
	)
}