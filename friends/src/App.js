import React from 'react';
import logo from './logo.svg';
import './App.css';
import Friends from './Components/Friends';
import axios from 'axios';
import FriendForm from './Components/FriendForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: '',
      image: '',
      birthday: '',
      species: '',
      postSuccessMessage: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
      .catch(console.log('Error!'))
  }

  changeHandler = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  submitFriend = e => {
    e.preventDefault();
    console.log('Submitting...')
    axios
      .post('http://localhost:5000/friends', {
        name: this.state.name,
        image: this.state.image,
        birthday: this.state.birthday,
        species: this.state.species
      })
      .then(response => {
        console.log(response);
        this.setState({
          postSuccessMessage: response.data.successMessage,
          friends: response,
          name: '',
          image: '',
          birthday: '',
          species: '',
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <FriendForm name={this.state.name} birthday={this.state.birthday} species={this.state.species} changeHandler={this.changeHandler} submit={this.submitFriend}/>
        <div className='container'>
          {this.state.friends.map(friend =>
            <Friends friend={friend} key={friend.id} />
          )}
        </div>
      </div>
    )
  }
}

export default App;
