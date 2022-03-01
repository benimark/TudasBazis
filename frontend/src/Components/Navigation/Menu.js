import React, { useEffect, useState } from 'react'
import {Container, Offcanvas, Row,Col,Form,Button,Spinner} from "react-bootstrap"
import $ from "jquery" 
import htmlparse from 'html-react-parser'
import {useDispatch, useSelector} from "react-redux"
import { getMenu } from '../../Redux/Actions/EnvActions';
import {login,logout, signup} from "../../Redux/Actions/UserActions"
import AskModal from '../Modal/AskModal'

export default function Menu(props) {
    const [selected,setSelected] = useState(0)
     
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    const [top,setTop] = useState(0)

    const [type,setType] = useState("login")
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [passwordAgain,setPasswordAgain] = useState("")
    const dispatch = useDispatch()
    const {loggedIn,error,data,loading} = useSelector(state => state.user)
    const {items} = useSelector(state => state.menu)
    const [modalShow,setModalShow] = useState(false) 

    useEffect(() => {
          setWidth($("body").width()<480?$("body").width():380+"px")
          setHeight($("body").height()-$("nav").height()+"px")
          setTop($("#nav").height()+15)
    }, []);

     const handleLogin = () =>{
          dispatch(login(email,password))
     }
     const handleLogOut = () =>{
          dispatch(logout())
          dispatch(getMenu())
          setModalShow(false)
     }
     const handleSignUp = () =>{
          if(password === passwordAgain){
               dispatch(signup(email,password,username))
          }
     }

    return (
        <Offcanvas className="d-flex flex-row" style={{height,top,width}} backdrop={false} show={props.show} onHide={props.handleClose} placement='start'>
                   <div className='icon-menu'>
                        {items&&items.map((entry,index)=>{
                             return (
                             <div key={entry.title+index+Date.now()} onClick={()=>setSelected(index)} className={['icon-menu-item',index===selected?"icon-menu-item-selected":""].join(" ")}>
                                 <i className={["bi",entry.icon].join(" ")}></i>
                              </div> 
                              )
                        })}
                    </div>
                    <Container className="menu p-4">
                         <Row>
                              <Col>
                                   <h1>
                                        {loggedIn && selected === 0 ?data&&data.name:items&&items[selected]?items[selected].title:""}
                                   </h1>
                              </Col>
                         </Row>
                         <Row className="">
                              <Col>
                              {selected===0 && !loggedIn?
                              <Form className="p-3">
                                   <Form.Group className="mb-3">
                                        <Form.Label>Email cím</Form.Label>
                                        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email"/>
                                   </Form.Group>
                                   
                                   {type==="register"&&<Form.Group className="mb-3">
                                        <Form.Label>Felhasználónév</Form.Label>
                                        <Form.Control onChange={(e)=>setUsername(e.target.value)}/>
                                   </Form.Group>}

                                   <Form.Group className="mb-3">
                                        <Form.Label>Jelszó</Form.Label>
                                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" />
                                   </Form.Group>

                                   {type==="register"&&<Form.Group className="mb-3">
                                        <Form.Label>Jelszó megint</Form.Label>
                                        <Form.Control onChange={(e)=>setPasswordAgain(e.target.value)} type="password" />
                                   </Form.Group>}

                                   {error?<p className="error text-center m-2">{error}</p>:""}

                                   {type==="login"?
                                   <Button variant="dark" onClick={()=>handleLogin()} className="w-100 mt-3">
                                        {loading?<Spinner animation="border" className="p-2" variant="light" />:"Bejelentkezés"}
                                   </Button>:
                                   <Button disabled={password!==passwordAgain} variant="dark" onClick={()=>handleSignUp()} className="w-100 mt-3">
                                   {loading?<Spinner animation="border" className="p-2" variant="light" />:"Regisztráció"}
                                    </Button>
                              }

                                  {type==="login"? 
                                   <p className="text-center mt-3 cursor-poiner" onClick={()=>setType("register")}>Még nincs fiókod?</p>
                                   :
                                   <p className="text-center mt-3 cursor-poiner" onClick={()=>setType("login")}>Már van fiókom</p>
                                   }

                              </Form>
                            :
                            selected===0 && loggedIn ? 

                            <div className='button-group p-3'>
                                 <Button variant="dark" className="w-100">
                                        Profil
                                 </Button>
                                 <Button variant="dark" className="w-100 mt-3">
                                        Adatok
                                 </Button>
                                 <Button variant="dark" className="w-100 mt-3">
                                        Beállítások
                                 </Button>
                                 <Button variant="dark" onClick={()=>setModalShow(true)} className="w-100 mt-3">
                                        Kijelentkezés
                                 </Button>
                                 <AskModal cancel buttonText="Kijelentkezés" show={modalShow} handleExit={()=>setModalShow(false)} handleClose={handleLogOut} title="Kijelentkezés" question="Biztos vagy benne hogy kijelentkezel?" />
                            </div>

                             : items&&items[selected]?htmlparse(items[selected].content):""
                              }
                              </Col>
                         </Row>
                    </Container>
        </Offcanvas>
    )
}
