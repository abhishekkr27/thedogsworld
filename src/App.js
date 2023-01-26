import axios from 'axios';
import React from 'react';
import './App.css';
import styled from "styled-components";

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

class Dog extends React.Component {
  constructor(){
    super();
    this.state = {
      imgURL: "https://picsum.photos/id/237/200/300",
      breed: [""],
      select: ""
    }
  }

  getDogImage = () => {
    const { select } = this.state;
    let url = "https://dog.ceo/api/breed/" + select + "/images/random";
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message
        });
        console.log(response.data.message)
      })
      .catch(err => {
        console.log("error fetching image");
      });
  };

  getBreed = () => {
    const {breed} = this.state;
    axios
      .get("https://dog.ceo/api/breeds/list")
      .then(response => {
        this.setState({
          breed: breed.concat(response.data.message)
        })
      })
      .catch(err => {
        console.log("error fetching list");
      });
  }

  getRandomImage = () => {
    const { breed } = this.state;
    const randomDog = Math.floor(Math.random()*breed.length);
    //Breed array at zero is an empty string. Ternary operator fetches wolfhound if zero is generated.
    const choice = (randomDog === 0 ? "wolfhound" : breed[randomDog]);
    //const choice = breed[randomDog];
    //console.log(breed);
    //console.log(breed.length)
    console.log(randomDog);
    let url = "https://dog.ceo/api/breed/" + choice + "/images/random"
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message,
          select: choice
        });
      })
      .catch(err => {
        console.log("error fetching image");
      });
      console.log(url);
  };

  handleSelect = (e) => {
    this.setState({
      select: e.target.value
    })
  }


  componentDidMount() {
    this.getBreed();
  }

  // componentDidMount() {
  //   this.getDogImage();
  // }

  render() {
    
    const { breed, imgURL, select} = this.state;
    
    return(
      <div className='App'>
        <h1 className='heading'>The Dogs World</h1>

        <p>Choose a dog from the drop down menu and click submit.</p>
        <select className='select' value={select} onChange={this.handleSelect}>
          {breed.map(e => 
            <option value={e}> {e} </option>
          )}
        </select>

        <Button id="submit" disabled={!select} onClick={this.getDogImage}>submit</Button>
        
        <p></p>
        <div id="img">
          <img alt="Dog" src={imgURL} />
        </div>

        <p></p>
        <p style={{textTransform: "uppercase"}}>Breed: {select}</p>
        <p> Or click the random button for a random dog.</p>
        <Button onClick={this.getRandomImage}>random</Button>
      </div>
    )
  }
}

export default Dog;
