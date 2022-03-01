import React, { useEffect } from 'react';
import AdminNav from "./AdminNav";
import Dashboard from "./Dashboard";
import { Col, Row } from "react-bootstrap";
import Users from "./Users/Users";
import { Routes,Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../Redux/Actions/UserActions';
import Exam from './Exams/Exam';
import NewExam from './Exams/NewExam';

export default function Admin() {
  const dispatch = useDispatch()
  //const {loggedIn} = useSelector(state => state.user)
  const loggedIn = true
  /*useEffect(() => {
    if(!loggedIn){
      let email = prompt('Email cím');
      let password = prompt('Jelszó');
      dispatch(adminLogin(email,password))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);*/
  
  const adminPage = () =>{
  return <Row className="admin-page">
    <Col md={4} lg={3} xl={2} sm={12} className={[window.screen.width<450&&"position-fixed","m-0 p-0"].join(" ")}>
      <AdminNav></AdminNav>
    </Col>
    <Col md={8} lg={9} xl={10} sm={12} className="m-0 p-3 overflow-auto" style={{maxHeight:"100vh"}}>
      <Routes>
        <Route path="/osszesites" element={<Dashboard/>}></Route>
        <Route path="/felhasznalok" element={<Users/>}></Route>
        <Route path="/erettsegik" element={<Exam/>}></Route>
        <Route path="/erettsegik/uj" element={<NewExam/>}></Route>
      </Routes>
    </Col>
  </Row>
  }

  return loggedIn?adminPage():<div>ACCESS DENIED</div>;
}
