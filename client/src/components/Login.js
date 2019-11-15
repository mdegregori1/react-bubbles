import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = (props) => {

  const [login, setLogin ] = useState({
    username: '',
    password: '',
    isLoggedIn: false
})

const handleChange = event => {
  setLogin({...login, [event.target.name]:event.target.value})
}

//username: 'Lambda School', password: 'i<3Lambd4'

const handleSubmit = event => {
  event.preventDefault();
  axiosWithAuth()
  .post('http://localhost:5000/api/login', login)
  .then( response => {
    console.log('response from post', response);
    localStorage.setItem('token', response.data)
    setLogin({...login, isLoggedIn: true})
    props.history.push('/bubblepage');
  })

}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="username"
          placeholder="Username"
          value={login.username}
          onChange={handleChange}
          />
          <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
