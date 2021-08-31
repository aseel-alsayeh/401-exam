import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap'
const axios = require('axios');



class FavCrypto extends React.Component {
  constructor(props){
    super(props)
    this.state={
      url:process.env.REACT_APP_SERVER_URL,
      apiCrudData:[],
    }
  }

  componentDidMount=async()=>{
    const apiResponse= await axios.get(`${this.state.url}/get?email=${this.props.auth0.user.email}`)
    this.setState({
      apiCrudData:apiResponse.data
    })
  }

  deleteFavItem=async(item)=>{
     const id=item._id
     const apiResponse= await axios.delete(`${this.state.url}/delete/${this.state.id}`)


  }
  render() {
    return(
      <>
        <h1>Fav Crypto List</h1>
        {this.state.apiCrudData.map(item=>{
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

      </>
    )
  }
}

export default withAuth0(FavCrypto);
