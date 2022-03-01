import React from 'react';
import {Modal,Button} from "react-bootstrap"

export default function AskModal(props) {
    
  return <Modal show={props.show} onHide={props.handleExit}>
  <Modal.Header closeButton>
    <Modal.Title>{props.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {props.question}
    {props.content}
  </Modal.Body>
  <Modal.Footer>
    {props.cancel && <Button variant="light" onClick={props.handleExit}>
      Mégse
    </Button>}
    <Button variant="dark" onClick={props.handleClose}>
      {props.buttonText}
    </Button>
  </Modal.Footer>
</Modal>
}
