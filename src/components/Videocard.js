import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Trash2 } from 'react-feather';
import { useState } from 'react';
import { deleteVedio } from '../services/allApis'
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addHistory } from '../services/allApis';
import uniqid from 'uniqid';
import { format } from 'date-fns';
function Videocard({ video, deleteStatus, inCard }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {

    let id = uniqid()//generate uniqid
    //generate date
    let date = format(new Date(), 'MMM Do yyyy,h:mm:ss a')

    //destructure url and caption
    const { url, caption } = video


    if (id != "" && date != "" && caption != "") {
      //create body
      const body = {
        id, url, caption, date
      }
      await addHistory(body)
    }
    setShow(true)
  }

  const handleDelete = async (id) => {

    const response = await deleteVedio(id)
    console.log(response);
    if (response.status >= 200 && response.status <= 300) {
      toast.success("video deleted successfully")
      deleteStatus(true)
    }

  }

  //create function  for dragging enable
  const dragStarted = (e, id) => {
    console.log("drag startted... source card id" + id);
    e.dataTransfer.setData("cardId", id)//dataTransfer method to store target event ,setData method to store id in key value format
  }
  return (
    <div>

      <Card
        draggable
        onDragStart={(e) => dragStarted(e, video?.id)} 
        style={{ width: '100%',height:'300px',padding:'20px', backgroundColor: "grey" }} className='mt-3'>
        <Card.Img variant="top" onClick={handleShow}  src={video?.thumbnail} style={{width:'100%',height:'150px'}}/>
        <Card.Body >
          <Card.Text >
            
            <div className='d-flex justify-content-between'>
            <p className=' text-dark' style={{fontSize:'15px'}}>  {video.caption.length>35?video.caption.slice(0,35):video.caption}</p>
            {inCard ? "" : <Trash2 onClick={() => { handleDelete(video?.id) }} size={40} ></Trash2>}
            </div>

          </Card.Text>

        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="390px" src={video?.url + "?autoplat=1"}

            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>


        </Modal.Body>

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

export default Videocard