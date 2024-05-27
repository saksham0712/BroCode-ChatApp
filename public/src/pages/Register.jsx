import React from 'react'
import styled from 'styled-components'
function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("from")
    }
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
        </form>
    </FromContainer>
    </>
  )
}
const FromContainer = styled.div``;
export default Register
