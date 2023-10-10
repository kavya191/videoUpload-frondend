import React from 'react'
import { Upload } from 'react-feather'
function Footer() {
  return (
    <div className='bg-primary p-2 text-center fixed-bottom  mt-5' data-bs-theme="dark" style={{width:'100vw'}}>
      <p className='text-white  fw-normal'>All Rights Reserved@<span><Upload></Upload></span>video uploader</p>

    </div>
  )
}

export default Footer