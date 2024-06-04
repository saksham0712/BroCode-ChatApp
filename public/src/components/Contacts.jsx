import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.png'

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])
    useEffect(() => { }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
    }
    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>BroCode</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={index} className={`contact ${index === currentSelected ? "selected" : ""}`} onClick={()=>changeCurrentChat(index,contact)}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
position: relative;
.brand{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img{
        height: 2rem;
    }
    h3{
        color: #fff;
        text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem; &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        display: flex;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color: #fff;
        
            }
        }
    }
    .selected{
        background-color: #9186f3;
    }
}
.current-user{
    background-color: #0d0d30;
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
    gap:2rem;
    .avatar{
        img{
            height: 4rem;
            padding: 7px;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: #fff;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        gap:0.5rem;
        .username {
            h2{
                font-size: 1rem;
            }
        }
    
      }
    //   @media screen and (min-width: 360px) and (max-width: 480px){
    //     grid-template-columns: 35% 65%;
    
    //   }
}
`
