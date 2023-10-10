import React, { useState } from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import Add from '../components/Add'
import View from '../components/View'
import Category from '../components/Category'
import { Link } from 'react-router-dom'

function Home() {
  //create state for add update
  const [addUpdate,setAddUpdate]=useState({})

  return (
   <>
   <h1 className='text-white text-center mt-4 mb-4' >All Video Cards</h1>
   <div>
    <Link to={"/history"} className='text-decoration-none'>
    <h3  className="ms-5 pb-3 d-flex justify-content-end me-4 "  style={{color:'blue'}} >Watch History </h3>  
    </Link>
  
   </div>


    <Container >
      <Row >
      
        <Col lg={2}>
          {/* setAddUpdate() function given to Add.js for managing addUpdate state that given to view.js */}
         <Add updateData={setAddUpdate}></Add>
        </Col>
        <Col lg={7}>
          {/* any change that doing in setUpdate() that will reflects on view.js */}
          <View data={addUpdate}></View>
        </Col>
        <Col lg={3}>
        <Category></Category>
        </Col>
      
      </Row>
    </Container>

    
   </>
  )
}

export default Home