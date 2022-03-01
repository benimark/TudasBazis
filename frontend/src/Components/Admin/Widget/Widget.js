import React from 'react';
import {Col} from "react-bootstrap"

export default function Widget(props) {
  return <Col className={["widget shadow bg-admin-primary",props.className].join(" ")} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>{props.children}</Col>
}
