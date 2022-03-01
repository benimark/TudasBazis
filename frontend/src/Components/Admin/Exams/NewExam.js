import React,{useState,useEffect} from 'react'
import {Form,Row,Col,Table} from "react-bootstrap"
import PanelType from "./Panels/PanelType"

export default function NewExam() {
   const panelTypes = ["Táblázat","Cím","Szöveg","Kép","Megjegyzés","Válasz","Videó"] 
   const [build,setBuild] = useState([])

   //TABLE
   const [tableShow,setTableShow] = useState(false)
   const [x,setX] = useState()
   const [y,setY] = useState()
   //END_TABLE

   const videoURI = () =>{
    let url = prompt('Youtube videó URL');
    if(url.includes("youtube")){
        setBuild([...build,{type:"video",value:url}])
    }else{
        alert("Hiba, nem youtube linket kaptam :'(")
    }
   }

   const addPanel = (type) =>{
      
    switch(type){
        case "Szöveg": setBuild([...build,{type:"text",value:null}]) ; break;
        case "Cím": setBuild([...build,{type:"header",value:null}]) ; break;
        case "Kép": setBuild([...build,{type:"image",value:null}]) ; break;
        case "Megjegyzés": setBuild([...build,{type:"note",value:null}]) ; break;
        case "Válasz": setBuild([...build,{type:"answer",value:null}]) ; break;
        case "Táblázat":setTableShow(!tableShow) ; break;
        case "Videó": videoURI() ; break;
        default :  setBuild([...build,{type:"text",value:null}]) ; break;
    }
   }
   const handleTableSave = (e,index,ik,ikr) => {
        const table = build[index]
        const newValue = {
            x:ik,
            y:ikr,
            value:e.target.value
        }
        if(table.coords.some((coord) => (coord.x === ik && coord.y === ikr))){
            table.coords.find((entry)=> entry.x === ik && entry.y === ikr).value = e.target.value
        }else{
            table.coords = [...table.coords,newValue]
        }
   }

   const handleDelete = (index) =>{
        setBuild(build.filter((entry,i)=> i !== index))
   }

  return (
      <Row className="d-flex justify-content-center align-items-center p-3">
          <h1 className='p-3 fw-bold text-center'>Új érettségi összeállítása</h1>
          <hr className='mb-5' style={{width:"70%"}}></hr>
        <Col sm={12} lg={8} className="newExam">
            <div>
                {build && build.map((entry,index)=>{
                    switch(entry.type){
                        case "text": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                <Form.Label>Szöveg</Form.Label>
                                                <Form.Control onChange={(e)=>setBuild(build.map((a,i)=> i === index ? {type:entry.type,value:e.target.value} : a))} as="textarea" rows={3} />
                                                <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                            </Form.Group>
                        case "header": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                <Form.Label>Cím</Form.Label>
                                                <Form.Control onChange={(e)=>setBuild(build.map((a,i)=> i === index ? {type:entry.type,value:e.target.value} : a))} type="text" />
                                                <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                            </Form.Group>
                        case "image": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                    <Form.Label>Képek</Form.Label>
                                                    <Form.Control onChange={(e)=>setBuild(build.map((a,i)=> i === index ? {type:entry.type,value:e.target.files} : a))} accept="image/png, image/gif, image/jpeg" multiple type="file" />
                                                    {build[index].value && Array.from(build[index].value).map(file => {return <img className="uploadedImg" src={URL.createObjectURL(file)} alt="img"></img>})}
                                                    <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                              </Form.Group>
                        case "note": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                <Form.Label>Megjegyzés</Form.Label>
                                                <Form.Control className='message-note' onChange={(e)=>setBuild(build.map((a,i)=> i === index ? {type:entry.type,value:e.target.value} : a))} type="text" />
                                                <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                            </Form.Group>
                        case "answer": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                <Form.Label>Válasz</Form.Label>
                                                <Form.Control disabled onChange={(e)=>setBuild(build.map((a,i)=> i === index ? {type:entry.type,value:e.target.value} : a))} as="textarea" rows={3} />
                                                <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                            </Form.Group>
                        case "video": return <div className='position-relative'>
                                            <iframe width="100%" height="500px" src={"https://www.youtube.com/embed/"+entry.value.split("=")[1]} title="YouTube video player" frameborder="0" allowfullscreen></iframe>
                                            <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                            </div>
                        case "table": return <Form.Group key={entry+index} className="mb-3 position-relative">
                                                    <Form.Label>Táblázat</Form.Label>
                                                    <Table className='tablazat' responsive striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    {
                                                                    Array.from({length: build[index].x}, (l,ik) => {return <th><input onChange={(e)=> handleTableSave(e,index,ik,0)} type="text" className="tableInput" ></input></th>})
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Array.from({length: build[index].y}, (l,ikr) => {return <tr>{Array.from({length: build[index].x}, (l,ik) => {return <td><input onChange={(e)=> handleTableSave(e,index,ik,ikr+1)} type="text" className="tableInput" ></input></td>})}</tr>})}
                                                            </tbody>
                                                            </Table>
                                                            <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                              </Form.Group>

                        default: return <Form.Group key={entry+index} className="mb-3 position-relative">
                                            <Form.Label>Szöveg</Form.Label>
                                            <Form.Control type="text" />
                                            <i onClick={()=>handleDelete(index)} className="bi bi-x-circle-fill"></i>
                                        </Form.Group>
                    }
                })}
            </div>

            {tableShow && <div className="tableChooser align-items-center justify-content-center d-flex flex-column gap-1">
                <div className="d-flex gap-1"><Form.Control onChange={(e)=>setX(e.target.value)} style={{padding:0,textAlign:"center"}} type="text" /> x <Form.Control onChange={(e)=>setY(e.target.value)} style={{padding:0,textAlign:"center"}} type="text" /></div> 
                {x && y && <p onClick={()=> {setBuild([...build,{type:"table",value:null,x,y,coords:[]}]);setTableShow(false)}} style={{cursor:"pointer",fontWeight:"500",fontSize:"15px"}}>Hozzáadás</p>}
            </div>}

            <div className='d-flex flex-row gap-2'>{panelTypes.map((type)=> {return <PanelType onClick={()=>addPanel(type)} key={type} label={type} />})}</div>
        </Col>
      </Row>
  )
}
