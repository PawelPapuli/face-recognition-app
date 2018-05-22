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


const initialState ={
  inputfield: '',
  imageUrl:'',
  bounding_box: {},
  route: 'signIn',
  isSignedIn: false,
  noErrors: true,
  user: {
    id:'',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
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

  onUrlChange = (event) => {
    this.setState({inputfield:event.target.value, bounding_box:{}});
  }

  onPictureSubmit = () => {
    this.setState({noErrors:true, imageUrl:this.state.inputfield},this.toggleErrorField);
      fetch('https://boiling-tor-71139.herokuapp.com/imageurl', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        input: this.state.inputfield
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('https://boiling-tor-71139.herokuapp.com/image', {
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
      .catch(error => {
        if (error){
          this.setState({noErrors:false}, this.toggleErrorField);
        }
    })
  }

  toggleErrorField = () => {
    const errElement = document.getElementById('error-info');
    if (this.state.noErrors) {
      errElement.style.display = 'none';
    } else {
      errElement.style.display = 'block';
    }
  }

  onRouteChange = (route) => {
    if (route==='home')
      this.setState({isSignedIn:true})
    else 
      this.setState(initialState)
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
            <p className='f4 dark-red' style={{display:'none'}} id='error-info'>Oops! Something went wrong, please try again with another picture.</p>
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
