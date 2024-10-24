import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();

    const fetchMessages = async () => {
        if (currentChat && currentUser) {
            try {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                });
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error("expected array", typeof response.data);
                }
            } catch (error) {
                console.error("this is the error", error);
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [currentChat, currentUser]);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        // Refresh messages after sending
        fetchMessages();
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMsg({ fromSelf: false, message: msg });
            });
        }
    }, [socket]);

    useEffect(() => {
        if (arrivalMsg) {
            setMessages((prev) => [...prev, arrivalMsg]);
        }
    }, [arrivalMsg]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);

        return () => clearInterval(interval);
    }, [currentChat, currentUser]); // Restart polling when chat changes

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div key={message.id || uuidv4()} ref={scrollRef}>
                                <div className={`message ${message.fromSelf ? "sender" : "received"}`}>
                                    <div className="content">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    height: 100%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                }
            }
        }
    }

    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;

        .message {
            display: flex;
            align-items: center;

            .content {
                max-width: 90%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }

        .sender {
            justify-content: flex-end;

            .content {
                background-color: #4f04ff21;
            }
        }

        .received {
            justify-content: flex-start;

            .content {
                background-color: #9900ff20;
            }
        }
    }
`;
