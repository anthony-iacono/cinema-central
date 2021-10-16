const api = {
  getUser(email, password) {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          password: password
        })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Holy mackerel! Are your creds correct?')
        }
        return response.json()
      })
      // .then(data => data.user)
      // .then(data => console.log(data))
      .catch(error => console.log(error))
  }
}

export default api
