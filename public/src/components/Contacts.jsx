import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import Logout from './Logout';

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const[toggle, setIstoggle] = useState(true);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
        setIstoggle(!toggle)
    };
    const toggleview = () => {
        setIstoggle(!toggle)

    }

    const containerStyle = {
        display: 'grid',
        gridTemplateRows: '10% 80%',
        overflow: 'hidden',
        backgroundColor: '#080420',
        position: 'relative',
    };

    const brandStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        margin: 'auto',
        padding: '10px',
    };

    const imgStyle = {
        height: '2rem',
    };

    const h3Style = {
        color: '#fff',
        textTransform: 'uppercase',
    };

    const contactsStyle = {
        display: toggle ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
        gap: '0.8rem',
        overflowX: 'hidden',
        minHeight: '30vh',

    };

    const contactStyle = (selected) => ({
        backgroundColor: selected ? '#9186f3' : '#ffffff39',
        minHeight: '5rem',
        width: '90%',
        cursor: 'pointer',
        borderRadius: '0.2rem',
        padding: '0.4rem',
        gap: '1rem',
        alignItems: 'center',
        transition: '0.5s ease-in-out',
        display: 'flex',
    });

    const avatarStyle = {
        height: '3rem',
    };

    const currentUserStyle = {
        backgroundColor: '#0d0d30',
        display: 'flex',
        width: '100%',
        // position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
    };

    const currentUserImgStyle = {
        height: '4rem',
        padding: '7px',
        maxWidth: '100%',
    };

    const usernameStyle = {
        color: '#fff',
    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <div style={containerStyle}>
                    <div style={brandStyle}>
                        <img src={Logo} alt="logo" style={imgStyle} />
                        <h3 style={h3Style} onClick={()=>{toggleview()}}>BroCode</h3>
                    </div>
                    <div style={contactsStyle}>
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                style={contactStyle(index === currentSelected)}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" style={avatarStyle} />
                                </div>
                                <div className="username">
                                    <h3 style={{ color: '#fff' }}>{contact.username}</h3>
                                </div>
                            </div>
                        ))}
                        <div style={currentUserStyle}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>

                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" style={currentUserImgStyle} />
                            </div>
                            <div className="username">
                                <h2 style={usernameStyle}>{currentUserName}</h2>
                            </div>
                            </div>
                            <Logout />

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
