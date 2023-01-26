import axios from 'axios';
import React from 'react';
import './App.css';

class Dog extends React.Component {
  constructor(){
    super();
    this.state = {
      imgURL: "",
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
        <h1>The Dogs World</h1>

        <p>Choose a dog from the drop down menu and click submit.</p>
        <select value={select} onChange={this.handleSelect}>
          {breed.map(e => 
            <option value={e}> {e} </option>
          )}
        </select>

        <button id="submit" disabled={!select} onClick={this.getDogImage}>submit</button>
        
        <p></p>
        <div id="img">
          <img alt="dog" src={imgURL} />
        </div>

        <p></p>
        <p>Breed: {select}</p>
        <p> Or click the random button for a random dog.</p>
        <button onClick={this.getRandomImage}>random</button>
      </div>
    )
  }
}

export default Dog;
