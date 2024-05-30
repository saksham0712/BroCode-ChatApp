import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loder1.gif';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { setAvatarRoutes } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

// Define SetAvatar component
export default function SetAvatar() {
    // Define API endpoint for fetching avatars
    const api = 'http://api.multiavatar.com/45678945';
    // Import useNavigate hook for navigation
    const navigate = useNavigate();
    // Define state variables for avatars, loading status, and selected avatar
    const [avatars, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    // Define options for toast notifications
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // useEffect to check if user is logged in, if not redirect to login page
    useEffect(async () => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, []);

    // Function to set profile picture
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            // Show toast notification if no avatar is selected
            toast.error("please select an avatar", toastOptions);
        } else {
            // Retrieve user data from local storage
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            // Send a POST request to set the selected avatar as profile picture
            const { data } = await axios.post(`${setAvatarRoutes}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            // Update user's avatar information if successful, otherwise show an error message
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
            } else {
                toast.error('Error setting avatar. please try again', toastOptions);
            }
        }
    };

    // useEffect to fetch avatars when the component mounts
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            // Fetch 4 avatars asynchronously
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random()) * 1000}`);
                // Convert fetched image data to base64 and store it in the data array
                const buffer = new Buffer.from(image.data);
                data.push(buffer.toString('base64'));
            }
            // Update state with fetched avatars and set loading status to false
            setAvatar(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);

    // Render the component with loader if still loading, otherwise render avatar selection UI
    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className='loader' /><h3>Loading...</h3>
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile pic &#128521;</h1>
                    </div>
                    <div className="avatars">
                        {
                            // Map over avatars array to display each avatar
                            avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                        {/* Render each avatar image with an onClick handler to select it */}
                                        <img src={`data:image/svg+xml;base64, ${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Button to set selected avatar as profile picture */}
                    <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
                </Container>
            )}
            {/* Toast container for displaying notifications */}
            <ToastContainer />
        </>
    );
}

// Styled component for container styling
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    color: white;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
            }
        }
        .selected {
            border: 0.4rem solid #4e0;
        }
    }
    .submit-btn {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }
`;
