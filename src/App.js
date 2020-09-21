import React from "react";
import {
  Menu
} from "semantic-ui-react";
import HeaderTop from "./components/HeaderTop"
import Title from './components/Title'
import ContainerInside from "./containers/ContainerInside"

class App extends React.Component {

  state={
    data:[],
    current:"default"
  }

  componentDidMount=()=>{
    fetch('http://localhost:3000/books')
    .then(res=>res.json())
    .then(string=>this.setState(()=>({data:string})))
  }

  getTitles= ()=>{
    return this.state.data.map(el=><Title key={el.id} el={el} getDetails={this.getDetails}/>)
  }

  getDetails=(id)=>{
    console.log("I need to get this book",id)
    fetch(`http://localhost:3000/books/${id}`)
    .then(res=>res.json())
    .then(string=>this.setState(()=>({current:string})))
  }

  addLike=(obj)=>{
    console.log("this is add sumabitch",this.state.current.id,obj)
    const id = this.state.current.id
    let newArray=[...obj,{"id":1, "username":"pouros"}]
    const sumthing = obj.find(el=>el.id===1)
    console.log(sumthing)
    if (sumthing){newArray=obj.filter(el=>el.id!==1)}
    console.log("this is my new",newArray)
    fetch(`http://localhost:3000/books/${id}`,{
      method: "PATCH",
      headers: {
      "Content-type": "application/json",
      "accept": "application/json"
      },
      body: JSON.stringify({
      users: newArray
      })
      }).then(res=>res.json()).then(obj=>{
        // let newBook = this.state.current
        // newBook.users=obj
        // console.log("this is my new Book", newBook)
        this.setState(()=>({current:obj}))
      })
  }

  render(){
    // console.log(this.state.data)
    console.log(this.state.current)
    return (
      <div>
        <HeaderTop/>
        <main>
          <Menu vertical inverted>
          {this.getTitles()}
          </Menu>
          <ContainerInside el={this.state.current} likes={this.addLike}/>
        </main>
      </div>
    );
  }
}

export default App;
