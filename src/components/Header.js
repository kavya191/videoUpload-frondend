import React from 'react'
import Container from 'react-bootstrap/Container';

import { Video } from 'react-feather';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div style={{width:'100vw'}}>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Link to={""} style={{textDecoration:'none'}}>
          <Navbar.Brand ><a className='p-2'><Video className='text-white' size={50} ></Video></a><span className='text-white fw-bolder mt-1'>Video Uploader</span></Navbar.Brand></Link>


      </Container>
    </Navbar>
    </div>
  )
}

export default Header