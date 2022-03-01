import React,{useState,useEffect} from 'react'
import {Navbar,Container} from "react-bootstrap"
import config from "../../config.json"
import Menu from './Menu'
import {useSelector,useDispatch} from "react-redux"
import { getMenu } from '../../Redux/Actions/EnvActions';

export default function Navigation() {  
    //CANVAS BEZÁRÁS
    const handleClose = () => setShow(false);
    //CANVAS KINYITÁS
    const handleShow = () => {setShow(true)};
    const [show, setShow] = useState(true);
    const {loggedIn} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(loggedIn){
            dispatch(getMenu())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    return (
    <div>
        <Navbar id="nav" className="bg-dark position-relative gradient" collapseOnSelect expand="lg" variant='dark'>
        <Container fluid className="justify-content-start">
            <Navbar.Toggle onClick={()=>setShow(!show)} />
            <Navbar.Brand className="ml-5 brand" href="/">{config.APP_FIRST_NAME}<span className='fw-bold'>{config.APP_LAST_NAME}</span></Navbar.Brand>
        </Container>
        <Menu show={show} handleClose={handleClose}></Menu>
        </Navbar>
    </div>
    )
}
