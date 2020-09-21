import React from 'react'
import {
    Menu
  } from "semantic-ui-react";
  
function Title (props){
    return(
    <Menu.Item as={"a"} onClick={e => props.getDetails(props.el.id)}>
        {props.el.title}
      </Menu.Item>
    )
}

export default Title