import React, { useEffect } from 'react';
import uniqid from 'uniqid';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCategory, getAllcategories, deleteCategory, dragSIngleVideo, updateCategory } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash } from 'react-feather';
import { Card, Col, Row } from 'react-bootstrap';
import Videocard from "../components/Videocard"

function Category() {

  //create state for category input
  const [catInput, setCatInput] = useState({
    id: "",
    categoryname: "",
    allvideos: []
  })
  //create state to store get all category
  const [categories, setCategories] = useState([])
  //state for delete
  // const [delCAt,setDelCat]=useState(false)


  //function for onchange in input field

  const setInput = (e) => {
    let { name, value } = e.target
    // console.log(name,value);
    setCatInput({ ...catInput, [name]: value })
    //console.log(e.target.value);
  }


  const addvideoCategory = async () => {

    // const { categoryname } = catInput
    //generate uniq id
    let id = uniqid()
    setCatInput({ ...catInput, [id]: id })
    const result = await addCategory(catInput)
    if (result.status >= 200 && result.status < 300) {
      alert("new category added")

    }
    setShow(false)
    setCatInput(result.data)
    getCategory()//category add cheyyumbo automattically disply cheyyaaan


  }
  //function for get all categories
  const getCategory = async () => {
    const respone = await getAllcategories()
    setCategories(respone.data);
  }
  console.log(categories);
  useEffect(() => {
    getCategory()
  }, [])
  //delete vedio category
  const categoryDelete = async (id) => {
    const response = await deleteCategory(id)
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) {
      alert("category deleted successfully")
      //to refresh
      getCategory()
    }

  }
  // console.log(catInput);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //function for dragOver to check hover
  const draggedOver = (e) => {
    e.preventDefault() //to prevent looping
    console.log("dragged over the category....");
  }
  //function for identify if dropped
  const dropped = async (e, id) => {
    console.log("category id" + id);//category id of video dropping category

    let sourceCardId = e.dataTransfer.getData("cardId")//id of dropping videoid
    console.log("source card id is" + sourceCardId);
//destructure video details 
    const { data } = await dragSIngleVideo(sourceCardId)
    console.log(data);
    //update category
    //find selected category from all category using cat id
    const selectedCategory = categories.find(i => i.id == id)
    console.log(selectedCategory);

    //add video to allvideo array of selected array
    selectedCategory.allvideos.push(data)
    console.log(selectedCategory);

    //update category in database
    await updateCategory(id, selectedCategory)
    //to access updated category from db
    getCategory()

  }



  return (
    <div>

      <button 
        className='btn btn-secondary w-100 text-white fw-bolder mb-3' 
        onClick={handleShow}>Category</button>
      {
        categories?.map(item => (
          <Card droppable
            onDragOver={(e) => draggedOver(e)}
            onDrop={(e) => dropped(e, item?.id)}
            className='mb-3 text-white   '>
            <div style={{ width: "100%", backgroundColor: "grey", color: "black" }} className='p-2  d-flex justify-content-between'>{item?.categoryname}
              <Trash className='ms-5' onClick={() => { categoryDelete(item?.id) }}></Trash></div>
              <Row>
                {item?.allvideos.map(i=>{
                  return<Col className='d-flex justify-content-center ' >
                    <Videocard className="d-flex justify-content-center"   inCard={true}  video={i}></Videocard>
                  </Col>
                })}
              </Row> 
          </Card>)

        )


      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2>Upload a video</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <FloatingLabel
            controlId="1"
            label="Id"
            className="mb-3"
          >
            <Form.Control name='id' onChange={setInput} as="textarea" />
          </FloatingLabel> */}

          <FloatingLabel
            controlId="2"
            label="Category Name"
            className="mb-3"
          >
            <Form.Control name='categoryname' onChange={setInput} as="textarea" />
          </FloatingLabel>




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addvideoCategory} >
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>


  )
}

export default Category