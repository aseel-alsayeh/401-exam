import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap'
const axios = require('axios');


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      url:process.env.REACT_APP_SERVER_URL,
      apiData:[],
    }
  }

  componentDidMount=async()=>{
    const apiResponse= await axios.get(`${this.state.url}/get`)
    this.setState({
      apiData:apiResponse.data
    })
  }

  addFavItem=async(title,image_url,description)=>{
    let dataObj={
      title,
      image_url,
      description,
    }
    const apiResponse=await axios.post(`${this.state.url}/create`, dataObj)
    console.log('added to fav')
  }

  render() {
    return (
      <>
        <h1>Crypto List</h1>
        {this.state.apiData.map(item=>{
          return (
            <>
            <Card>
              <Card.Body>
                <Card.Text>
                  {item.title} 
                </Card.Text>
                <Card.Img src={item.image_url}/>
                <Card.Text>{item.toUSD}</Card.Text>
                <br></br>
                <Card.Text>{item.description}</Card.Text>
  
              </Card.Body>
              <Card.Footer>
               <Button onClick={()=>{this.addFavItem(item.title,item.image_url,item.description)}}>ADD to fav </Button>
              </Card.Footer>

            </Card>
            </>
          )
        })
          
       }
    {console.log(this.state.apiData)}
      </>
    )
  }
}


export default Home;
