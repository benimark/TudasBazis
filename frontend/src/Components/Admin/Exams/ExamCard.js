import React from 'react'
import {Col} from "react-bootstrap"
import config from "../../../config.json"

export default function ExamCard(props) {
  const colors = config.COLORS

  return (
    <Col style={{backgroundColor:props.color?colors[props.color>3?1:props.color-1]:colors[0]}} sm={12} lg={4} className="ExamCard widget">
        <h2>{props.title}</h2>
        <h1>{props.number}{props.percent&&"%"}</h1>
    </Col>
  )
}
