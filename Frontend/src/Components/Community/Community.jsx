import React from 'react';
import CustomCard from "./Card";
import Navbar from '../Navbar/Navbar';
import UserList from './UserList';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Community = () => {
  return (
    <>
      <Navbar />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <UserList/>
          </div>

          <div className="col-md-9">
            <Form className="mb-3" style={{ marginLeft: '6rem' }}>
              <div className="d-flex">
                <Form.Group controlId="exampleForm.ControlInput1" className="mr-2">
                  <Form.Label>Enter your community post</Form.Label>
                  <Form.Control type="text" placeholder="write something good :)" />
                </Form.Group>
                <Form.Group controlId="formFile" style={{marginTop:"2rem"}} className="mb-3 mr-3">
                  <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary"  style={{ height: '2rem',marginTop:'2rem' }}>Post</Button>
              </div>
            </Form>
            <CustomCard
              username="User 1863"
              profilePicSrc="https://play-lh.googleusercontent.com/0SAFn-mRhhDjQNYU46ZwA7tz0xmRiQG4ZuZmuwU8lYmqj6zEpnqsee_6QDuhQ4ZofwXj=w240-h480-rw"
              date="18th December 20:30"
              description="This gym has good equipment. Wanna hit the gym with me?"
              imageSrc="https://img.freepik.com/free-photo/dumbbells-floor-gym-ai-generative_123827-23744.jpg"
            />
            <br />
            <CustomCard
              username="User 2"
              profilePicSrc=""
              date="19th December 15:45"
              description="Just finished a great workout! Feeling pumped!"
              imageSrc="https://img.mensxp.com/media/content/2019/Jan/31-days-of-fitness-nagarjun-went-from-being-a-bullied-skinny-boy-to-lean-workout-machine-600-3-1546594363.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
