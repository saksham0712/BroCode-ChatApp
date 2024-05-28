import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("from")
    }
    const handleChange = (event) => {}
    
  return (
    <>
      <FromContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src="" alt="" />
                <h1>BroCode</h1>
            </div>
            <input type="text" name="username" id="username" placeholder='Username' onChange={e=>handleChange(e)}/>
            <input type="email" name="email" id="email" placeholder='Email' onChange={e=>handleChange(e)}/>
            <input type="password" name="password" id="pass" placeholder='Password' onChange={e=>handleChange(e)}/>
            <input type="password" name="confirmPassword" id="pass" placeholder='Confirm password' onChange={e=>handleChange(e)}/>
            <button type="submit">Create User</button>
            <span>Already have an account ?<Link to='/login'>Login</Link></span>
        </form>
    </FromContainer>
    </>
  )
}
const FromContainer = styled.div``;
export default Register
