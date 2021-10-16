import React, { Component } from 'react'
import '../styles/App.css'

import LoginForm from './LoginForm'
import Gallery from './Gallery'
import Details from './Details'
import movieData from '../data/movieData'

class App extends Component {
  state = {
    email: '',
    password: '',
    userID: '1',
    userName: '',
    movies: [],
    selectedMovieID: 0,
    selectedMovie: null
  }

  componentDidMount = () => {
    // fetch('')
    this.setState({ movies: movieData.movies })
  }

  displayDetails = (id) => {
    const selectedMovie = movieData.movies.find(movie =>
      movie.id === id
    )
    this.setState({ selectedMovie: selectedMovie })

  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    // fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: {
    //     "email": "fake@email.com",
    //     "password": "password"
    //   }
    // })
    // .then(response => response.json())
    // .then({user: {id, name}} => {
    //   this.setState({ userID: id, userName: name })
    // })
    // .catch({error} => console.warn(error))
  }

  render() {
    let view;
    if (!this.state.userID) {
      view = <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={this.state.email}
        password={this.state.password}
      />
    } else if (this.state.selectedMovie) {
      view = <Details
        selectedMovie={this.state.selectedMovie}
      />
    } else {
      view = <Gallery
        movies={ this.state.movies }
        displayDetails={ this.displayDetails }
      />
    }

    return (
      <>
        <header>
          <h1>RaNcId ToMaTiLlOs</h1>
        </header>
        <main>
          {view}
        </main>
        <footer>
          <h5>© 2021</h5>
        </footer>
      </>
    )
  }
}

export default App;
