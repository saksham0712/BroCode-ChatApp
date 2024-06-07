import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
// gjhgjhghj
function Chat() {
  const socket =  useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  // const user = currentUser._id;
  // const chat = currentChat._id;
  useEffect(() => {
    const CheckVal = async () => {

      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true)
      }
    }
    CheckVal();
  }, []);

useEffect(()=>{
if(currentUser){
  socket.current = io(host);
  socket.current.emit("add-user", currentUser._id);
}
},[currentUser])

  useEffect(() => {
    const redirc = async () => {

      if (currentUser) {
        // console.log(currentUser)
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        } else {
          navigate('/setAvatar')
        }
      }
    }
    redirc();
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
        isLoaded && currentChat === undefined ? (<Welcome currentUser = {currentUser.username} />) : (<ChatContainer currentChat = {currentChat}  currentUser={currentUser} 
          // chat = {currentChat._id} 
          // user = {currentUser._id}
          socket={socket}
          />)
        }
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
  
  @media screen and (min-width: 360px) and (max-width: 480px){
    grid-template-rows: 35% 65%; 
  }
}
`;
// i am doing my work 
export default Chat
