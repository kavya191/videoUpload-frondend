import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Videocard from './Videocard'
import { getAllVideos } from '../services/allApis'
function View({data}) {
  const [videos, setVideos] = useState([])
    //create state for delete vedio
    const [deleteVideo,setDeleteVideo]=useState(false)

  const getVideos = async () => {
    const result = await getAllVideos()
    setVideos(result.data);
  }
  console.log(videos);
  useEffect(() => {
    getVideos()
  }, [data,deleteVideo])
  return (
    <div className='border p-3 rounded'>
      <Container>
      <Row>
        {videos?.map(video => (
        <Col sm={12} md={6}>
          <Videocard video={video} deleteStatus={setDeleteVideo}  ></Videocard>
        </Col>)

        )}

      </Row>
      </Container>

    </div>
  )
}

export default View