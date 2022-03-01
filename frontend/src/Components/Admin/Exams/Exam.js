import React from 'react'
import "./Exam.css"
import {Row,Table,Button} from "react-bootstrap"
import ExamCard from './ExamCard'
import Wrapper from "../../Wrapper/Wrapper"
import Widget from "../Widget/Widget"
import {Link} from "react-router-dom"

export default function Exam() {
  return (
    <Wrapper className="Exam">
        <Row>
            <ExamCard color={1} title="Témakörök száma" number={2}></ExamCard>
            <ExamCard color={2} title="Érettségik száma" number={4}></ExamCard>
            <ExamCard color={3} title="Emelt/Közép arány" number={50} percent></ExamCard>
        </Row>
        <Row>
            <Widget>
            <Table striped hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Tantárgy</th>
                        <th>Témakör</th>
                        <th>Érettségi éve</th>
                        <th>Érettségi típusa</th>
                        <th>Létrehozás dátuma</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1.</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td></tr>
                        <tr><td>1.</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td></tr>
                        <tr><td>1.</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td></tr>
                        <tr><td>1.</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td></tr>
                        <tr><td>1.</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td><td>Dummy</td></tr>
                    </tbody>
            </Table>
            <Link to="/erettsegik/uj"><Button style={{backgroundColor:"white"}} variant="light">Új érettségi megoldás</Button></Link>
            </Widget>
        </Row>
    </Wrapper>
  )
}
