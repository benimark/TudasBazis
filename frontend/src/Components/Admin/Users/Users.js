import React, { useEffect, useState } from 'react';
import Wrapper from "../../Wrapper/Wrapper"
import {Row,Table} from "react-bootstrap"
import Widget from "../Widget/Widget"
import axios from "axios"
import moment from "moment"

export default function Users() {
  const [users,setUsers] = useState([])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('data')).token}` }
    }
    await axios.get("/api/users/user-list",config).then((res)=>{
      setUsers(res.data)
    })
  }, []);
  
  return <Wrapper>
      <Row>
        <Widget md={12} className="users">
        {users.length>0?
        
        <Table striped hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Felhasználónév</th>
                    <th>Email cím</th>
                    <th>Regisztráció dátuma</th>
                    <th>Típus</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    users.map((user,index)=>{
                      return <tr key={user+index+Date.now()}><td>{index+1}</td><td>{user.name}</td><td>{user.email}</td><td>{moment(user.createdAt, "YYYYMMDD").fromNow()}</td><td>{user.isAdmin?"Admin":"Felhasználó"}</td></tr>
                    })
                  }
                </tbody>
        </Table>
        :
        <div className='d-flex justify-content-center align-items-center w-100 h-100'><div className="spinner-border text-light" role="status"></div></div>
        }
        </Widget>

      </Row>
  </Wrapper>;
}
