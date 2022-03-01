import React, { useEffect, useState } from 'react';
import {Row,Col} from "react-bootstrap"
import "./Dashboard.css"
import moment from "moment"
import Widget from './Widget/Widget';
import Wrapper from "../Wrapper/Wrapper"

export default function Dashboard() {
  const [time,setTime] = useState(moment().format('LT'))
  useEffect(() => {
    setInterval(() => setTime(moment().format('LT')), 1000);
  }, []);
  

  return  ( 
  <Wrapper>
    <Row>
        <Widget md={12}>
            <Row>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        <h1 className='w-100 time'>{moment().format('ll')} · {time}</h1>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex justify-content-end w-100">
                        <div className='user-info d-flex flex-column mr-1 align-items-end'>
                            <p>Béni Márk</p>
                            <p className="fw-bold">Admin</p>
                        </div>
                            <img className='rounded-circle' width="50px" height="50px" alt="Profile" src="https://static.independent.co.uk/2022/01/07/18/Missing_Girl_Body_Found_98437.jpg?width=982&height=726&auto=webp&quality=75" />
                        </div>  
                    </Col>
            </Row>
        </Widget>
        <Widget md={6}>Szia! 6</Widget>
        <Widget md={6}>Szia! 6</Widget>
    </Row>
    
  </Wrapper>
  )
}
