import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot1.gif'
export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser}</span>
      </h1>
      <h3>Please select a Chat to start Messaging.</h3>
    </Container>
  )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img{
    height: 20rem;

}
span{
    color: #66d9ef;
}
`