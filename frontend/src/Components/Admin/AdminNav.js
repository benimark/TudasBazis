/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {Row,Col} from "react-bootstrap"
import config from "../../config.json"
import admin from "../../admin.json"
import {Link} from "react-router-dom"
import $ from "jquery"
import "./Admin.css"

export default function AdminNav() {
  const [url,setUrl] = useState(window.location.pathname.replace("/",""))
  const adminURIList = Object.values(admin.menu_items).map((entry)=>entry.url)
  
  useEffect(() => {
    if(window.location.pathname === "/" || !adminURIList.includes(window.location.pathname.replace("/",""))){
      window.location.pathname = "/osszesites"
    }
  }, [adminURIList]);

  const handleNav = () =>{
    $('.sidebar').toggle({direction:"left"},1000)
  }

  return  (
  <div>
    <div onClick={()=>handleNav()} className='menuOpen'><i className="bi bi-three-dots-vertical"></i></div>
    <div className='sidebar bg-admin-primary'>
    <Row className="position-relative">
      <Col md={12} className="logo d-flex justify-content-center align-items-center flex-column">
      <h3>{config.APP_FIRST_NAME}<span className='fw-bold'>{config.APP_LAST_NAME}</span></h3>
      <h4>Vezérlőpult</h4>
      <hr className="hr border" />
      </Col>
      <Col md={12} className="links d-flex justify-content-center">
        <ul className="mt-3">
          {admin.menu_items.map((item,i)=>{
            if(item.hide !== true){
            return (
              <Link to={item.url} key={item+i+Date.now()} onClick={()=>setUrl(item.url)}>
            <li className={url === item.url ? "selected" : null}>
              <i className={["bi ",item.icon].join(" ")}></i>
              <p>{item.title}</p>
            </li>
             </Link>
            )
          }
          })}
        </ul>
        <ul>
        </ul>
      </Col>
    </Row>
  </div>
  </div>
    )
}
