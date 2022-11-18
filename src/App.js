import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particless from './components/Particles/Particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const initalState = {
  input:'',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state= initalState;
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let leftCol = [];
    let topRow = [];
    let rightCol =[];
    let bottomRow = [];
    let confidence = [];
    for (let element in data.outputs[0].data.regions){
      let clarifaiFace = data.outputs[0].data.regions[element].region_info.bounding_box;
      let clarifaiConfidence = (data.outputs[0].data.regions[element].value);
      leftCol.push(clarifaiFace.left_col * width);
      topRow.push(clarifaiFace.top_row * height);
      rightCol.push(width - (clarifaiFace.right_col * width));
      bottomRow.push(height - (clarifaiFace.bottom_row * height));
      confidence.push((clarifaiConfidence*100).toFixed(2)+"%");
    }
    return {leftCol,topRow,rightCol,bottomRow,confidence};
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageURL: this.state.input}); 
    fetch('https://facerecognition-api.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response){
        fetch('https://facerecognition-api.onrender.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initalState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {    
    return (
      <div className="App">
          <Particless className="particles"/>         
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home' 
            ? <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
              </div>
            : (
              this.state.route==='signin' || this.state.route==='signout'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }
      </div>
    );
  }
}

export default App;
