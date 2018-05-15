import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageUrl from './components/ImageUrl/ImageUrl';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import {particlesOptions} from './particlesOptions.js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'a0ad2545b34841c39408b6d5bd587fe9'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      inputfield: '',
      imageUrl:'',
      bounding_box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  onUrlChange = (event) => {
    this.setState({inputfield:event.target.value, bounding_box:{}});
  }

  onButtonClick = (event) => {
    console.log('click');
    this.setState({imageUrl:this.state.inputfield});
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.inputfield)
      .then(response => this.displayBoxOnFace(this.whereIsFace(response)))
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route==='home')
      this.setState({isSignedIn:true})
    else 
      this.setState({isSignedIn:false})
    
    this.setState({route: route})
  }

  whereIsFace = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBoxOnFace = (box) => {
    this.setState({bounding_box: box});
    console.log(this.state);
  }

  render() {
    const {isSignedIn, imageUrl, route, bounding_box} = this.state;
    return (
      <div className="App">
        <Particles 
          className = 'particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        {route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageUrl onUrlChange = {this.onUrlChange} onButtonClick={this.onButtonClick}/>
            <FaceRecognition box={bounding_box} imageUrl={imageUrl}/>  
        </div>
        : route==='register' 
            ? <Register onRouteChange = {this.onRouteChange}/>
            : <SignIn onRouteChange = {this.onRouteChange}/>
          
        }
      </div>
    );
  }
}

export default App;
