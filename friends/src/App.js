import React from 'react';
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
      species: ''
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
        console.log('response', response);
        this.setState({
          friends: response.data,
          name: '',
          image: '',
          birthday: '',
          species: '',
        });
      })
      .catch(err => console.log(err));
  }

  updateFriend = e => {
    const target = (e.target.value).split(',')
    const targetId = target[0]
    e.preventDefault();
    console.log(`Updating...${target[0]}`)
    axios
  .put(`http://localhost:5000/friends/${targetId}`, {
    id: targetId,
    name: ((this.state.name === '') ? target[1] : this.state.name),
    image: ((this.state.image === '') ? target[2] : this.state.image),
    birthday: ((this.state.birthday === '') ? target[3] : this.state.birthday),
    species: ((this.state.species === '') ? target[4] : this.state.species)
  })
  .then(response => {
    console.log(response)
    this.setState({
      friends: response.data,
      name: '',
      image: '',
      birthday: '',
      species: '',
    });
  })
  .catch(err => console.log(err));

  }

  deleteFriend = e => {
    const target = e.target.value
    e.preventDefault();
    console.log('delete', target)
    axios
      .delete(`http://localhost:5000/friends/${target}`)
      .then(response => {
        console.log(response)
        this.setState({
          friends: response.data
        })
      })
      .catch(err => console.log(err));
  };



  render() {
    return (
      <div>
        <FriendForm name={this.state.name} image={this.state.image} birthday={this.state.birthday} species={this.state.species} changeHandler={this.changeHandler} submit={this.submitFriend} />
        <div className='container'>
          {this.state.friends.map(friend =>
            <Friends friend={friend} key={friend.id} delete={this.deleteFriend} update={this.updateFriend} />
          )}
        </div>
      </div>
    )
  }
}

export default App;
