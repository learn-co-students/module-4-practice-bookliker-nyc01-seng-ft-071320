import React from 'react'
import {
    List
  } from "semantic-ui-react";

export default function ListIn (props){
    console.log("this is my list",props)
    return <List.Item icon="user" content={props.user.username} />
}

// return <List.Item icon="user" content={props.user} />

