import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getWatchHistory } from "../services/allApis"
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function History() {

    //create state to access hsitory details
    const [history, setHistory] = useState([])
    //function for get watch history
    const watchHistory = async () => {
        const response = await getWatchHistory()
        setHistory(response.data)
    }
    useEffect(()=>{
        watchHistory()
    },[])
    return (
        <div  style={{height:"100vh"}}>
            <h2 className='d-flex justify-content-center mt-3'>Watch History</h2>
            <Container>
            <Table striped bordered hover style={{fontSize:'9px'}} className='mb-5'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Caption</th>
                        <th>Vedio Url</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>

                <tbody style={{fontSize:'8px'}}>
                    {
                        history.length > 0 ? history.map((i, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{i?.caption}</td>
                                <td>{i?.url}</td>
                                <td>{i?.date}</td>
                            </tr>) :
                            <h2 className='text-center'>Not Watched Any Videos</h2>
                    }


                </tbody>
            </Table>

            </Container>
           
            <div className='d-flex justify-content-center '>
                <button className='btn btn-dark mb-5'>
                    <Link to={"/home"}><Home></Home></Link></button>
            </div>
        </div>
    )
}

export default History