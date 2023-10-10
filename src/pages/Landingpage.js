import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import {  Upload, Video } from 'react-feather'

import { Link } from 'react-router-dom'
function Landingpage() {
  return (
    <Container style={{background:"dark",height:"100vh"}}>
      <Row>
        <Col className='mt-2'>
        <img style={{marginTop:"5rem",width:"70%"}}  src="https://i.postimg.cc/xChx80Nq/Elegantthemes-Softies-Upload-256.png" alt="" />
        </Col>
        <Col>
        <div className='mt-5 text-center text-info '>
          <h1 >Welcome To <span className='p-1 text-primary'><Video></Video></span>Video Uploader</h1>
          <h3 className='text-primary'>Easy Video Uploader</h3>
          <p className='text-white' style={{textAlign:'justify'}}>Video Uploader is a free and open-source, portable, cross-platform media player software and streaming media server developed by the VideoLAN project. VLC is available for desktop operating systems and mobile platforms, such as Android, iOS and iPadOS. <var></var></p>
            <div>
              <Link to='/home'>
                <button className='btn btn-info'>Upload<span className='p-1'><Upload></Upload></span></button>
              </Link>
              
            </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Landingpage