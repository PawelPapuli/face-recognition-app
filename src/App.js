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
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log);
  }

  onUrlChange = (event) => {
    this.setState({inputfield:event.target.value, bounding_box:{}});
  }

  onPictureSubmit = (event) => {
    this.setState({imageUrl:this.state.inputfield});
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.inputfield)
      .then(response => {
        if (response){
          fetch('http://localhost:3000/image', {
            method:'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayBoxOnFace(this.whereIsFace(response))
    })
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageUrl onUrlChange = {this.onUrlChange} onButtonClick={this.onPictureSubmit}/>
            <FaceRecognition box={bounding_box} imageUrl={imageUrl}/>  
        </div>
        : route==='register' 
            ? <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          
        }
      </div>
    );
  }
}

export default App;
