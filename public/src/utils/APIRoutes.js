
export const host = process.env.REACT_APP_API_URL;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoutes = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const  sendMessageRoute = `${host}/api/messages/addmsg`;
export const  getAllMessagesRoute = `${host}/api/messages/getmsg`;
// hello`