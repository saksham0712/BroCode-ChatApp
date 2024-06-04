import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';

function Chat() {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    const CheckVal = async()=> {

        if (!localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }
   CheckVal();
}, []);
  return (
    <Container>
      <div className="container">

      </div>
    </Container>
  ) 

}
const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
justify-content: center;
background-color: #131324;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;

  }
  @media screen and (min-width: 360px) and (max-width: 480px){
    grid-template-columns: 35% 65%;

  }
}
`;
// i am doing my work 
export default Chat
