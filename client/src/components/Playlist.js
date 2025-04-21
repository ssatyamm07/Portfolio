// import React, { useEffect, useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import projectData from './data';
// import Spinner from 'react-bootstrap/Spinner';

// const Playlist = () => {

//   const [spin, setSpin] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setSpin(false)
//     }, 1500)
//   },[])
//   return (
//     <>
//       {
//         spin ? <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
//           <Spinner animation="border" variant="danger" /> &nbsp;&nbsp; Loading .....
//         </div> : <div className="container">
//           <h2 className='text-center mt-2'>Projects</h2>
//           <div className="card_div">
//             <div className="row d-flex justify-content-around align-items-center">
//             {
//                 projectData.map((el, index) => {
//                   return (
//                     <>
//                       <Card style={{ width: '20rem', height: "18rem" }} className="mt-4 mb-4">
//                     {/* <Card.Img
//                       variant="top"
//                       style={{ width: "20rem", marginLeft: "-13" }}
//                       src={el.imgsrc}
//                     /> */}
//                     <Card.Img variant="top" style={{ width: '20rem', marginLeft: -13 }} src={el.imgsrc} />
//                     <Card.Body className='d-flex justify-content-center flex-column'>
//                     <Card.Title className='text-center'>{el.projectName}</Card.Title>
//                         <Card.Text className='text-center'>
//                             {el.description}
//                         </Card.Text>
//                       <Button variant="primary">
//                         <a href={el.demo} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-light">
//                           Live Demo
//                         </a>
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     }
//     </>
//   );
// };

// export default Playlist;
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import projectData from './data';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Playlist.css';

const Playlist = () => {
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const timer = setTimeout(() => setSpin(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {spin ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
          <Spinner animation="border" variant="primary" /> &nbsp;&nbsp; Loading...
        </div>
      ) : (
        <div className="container playlist-wrapper">
          <h2 className='text-center mt-4 mb-4'>✨ My Projects</h2>
          <div className="row">
            {projectData.map((el, index) => (
              <div
                className="col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4"
                key={index}
                data-aos="zoom-in"
              >
                <Card className="custom-card shadow-sm border-0">
                  <Card.Img variant="top" className="project-img" src={el.imgsrc} alt={el.projectName} />
                  <Card.Body className='d-flex flex-column align-items-center text-center'>
                    <Card.Title className='mb-2'>{el.projectName}</Card.Title>
                    <Card.Text className='mb-3'>{el.description}</Card.Text>
                    <Button variant="dark">
                      <a
                        href={el.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-light"
                      >
                        🔗 Live Demo
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
