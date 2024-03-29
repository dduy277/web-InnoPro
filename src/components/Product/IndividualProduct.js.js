import React from 'react'

export const IndividualProduct = ({ individualProduct }) => {
  //console.log(individualProduct);
  return (
    <div className='product'>
      <div className='product-img'>
        <img src={individualProduct.url} alt="product-img" />
      </div>
      <div className='product-text title'>title: {individualProduct.title}</div>
      <div className='product-text description'>descript: {individualProduct.description}</div>
      <div className='product-text price'> {individualProduct.price}Đ</div>
      {/* <div className='btn btn-danger btn-md cart-btn'>ADD TO CART</div> */}
    </div>
  )
}
