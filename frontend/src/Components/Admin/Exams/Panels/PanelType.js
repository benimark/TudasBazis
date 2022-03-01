import React from 'react'

export default function PanelType(props) {
  return (
    <div onClick={props.onClick} className='panelType'>+{props.label}</div>
  )
}
