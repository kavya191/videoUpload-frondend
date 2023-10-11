import React from 'react'
import { Upload } from 'react-feather'
function Footer() {
  return (
    <div className='bg-primary p-1 text-center mt-5' data-bs-theme="dark" style={{width:'100vw'}}>
      <p className='text-white  fw-normal mt-2'>All Rights Reserved@<span><Upload></Upload></span>video uploader</p>

    </div>
  )
}

export default Footer