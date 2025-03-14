export const getConversationId = (user, users) => {
  return users[0]._id === user.id ? users[1]._id : users[0]._id;
};

export const getConversationName = (user, users) => {
  return users[0]._id === user.id ? users[1].username : users[0].username;
};
export const getConversationPicture = (user, users) => {
  return users[0]._id === user.id ? users[1].picture : users[0].picture;
};

export const checkOnlineStatus = (onlineUsers, user, users) => {
  let convoId = getConversationId(user, users);
  let check = onlineUsers.find((u) => u.userId === convoId);
  return check ? true : false;
};
