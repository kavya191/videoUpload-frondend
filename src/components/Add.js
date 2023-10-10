import React, { useState } from 'react'
import uniqid from 'uniqid';
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addvideo } from '../services/allApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './Add.css'
function Add({updateData}) {

    //create state to store input data-4 input field we use one state for all.create object to hold input
    const [uploadData, setUploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    //function to take input data
    //here an onChange takes place
    const setInput = (e) => {
        //access key and value.here key is name
        //here name is an attribute contains caption,thumbnail and url .value contains each name values
        let { name, value } = e.target
        // console.log(name,value);
        //spread operator is used to add new data with existing data.spread operator carry existing data and connect with new input
        setUploadData({ ...uploadData, [name]: value })


    }
    //function for extract url - for input field url
    const extractUrl = (e) => {
        let vedioUrl = e.target.value
        // console.log(vedioUrl);
        //https://www.youtube.com/watch?v=aOEcTV4chA8&t=1s
        //check the url contains "v=" string
        if (vedioUrl.includes("v=")) {
            let index = vedioUrl.indexOf("v=")// index is 30
            console.log(index);
            let extractUrl = vedioUrl.substring(index + 2, index + 13) // take values in between
            console.log(extractUrl);
            //make full url
            let fullUrl = `https://www.youtube.com/embed/${extractUrl}`
            //update with uploadData input
            setUploadData({ ...uploadData, ["url"]: fullUrl })
        }
    }
    //function to add-when clicking add button
    const handleAdd = async () => {
        let id = uniqid()
        //already ulla data ude kude id kudi varaan
        setUploadData({ ...uploadData, ["id"]: id })
        const { caption, thumbnail, url } = uploadData
        if (caption == "") {
            alert("please add caption")
        }
        else if (thumbnail == "") {
            alert("please add thumbnail")
        }
        else if (url == "") {
            toast.warn("please add url")
        } else {
            const result = await addvideo(uploadData)
            if (result.status >= 200 && result.status <= 300) {
                alert("new video added")
                setShow(false)
                updateData(result.data)
            }
            console.log(result);
        }




    }
    //  console.log(uploadData);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='text-center'>
                <span className='btn text-bg-primary text-dark'> <PlusCircle size={50} variant="primary" onClick={handleShow}></PlusCircle></span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>Upload Video</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Video Caption"
                        className="mb-3"
                    >
                        <Form.Control name='caption' onChange={setInput} as="textarea" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea1"
                        label="Video cover Image URL">
                        <Form.Control
                            name='thumbnail'
                            onChange={setInput}
                            as="textarea"
                            style={{ height: '60px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Video URL">
                        <Form.Control
                            name='url'
                            onChange={extractUrl}
                            className='mt-3'
                            as="textarea"
                            style={{ height: '60px' }}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
{/* 
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
            /> */}
        </>
    )
}

export default Add