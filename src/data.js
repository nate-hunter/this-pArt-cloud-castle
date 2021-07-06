import { v4 as uuid } from "uuid";

export const defaultUserImage = 'https://res.cloudinary.com/pandaboogie/image/upload/v1620906249/zoqsjhmjpzpqoeyiqbwe.jpg';

export const defaultUser = {
  id: uuid(),
  username: "barry-garden",
  name: "barry",
  avatar: defaultUserImage
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "barry-garden",
    name: "barry",
    avatar: defaultUserImage
  };
}

export const defaultPost = {
  id: uuid(),
  title: "A public art piece",
  area: "SOHO",
  likes: 10,
  caption: `<span class="">where that 🔥</span>`,
  user: defaultUser,
  media:
    "https://res.cloudinary.com/pandaboogie/image/upload/v1621476915/xupvjnm2ezup1awpqm4k.jpg",
  comments: [],
  created_at: "2021-06-08T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    title: "A public art piece",
    area: "SOHO",
    likes: 10,
    caption: `<span class="">where that 🔥🔥</span>`,
    user: defaultUser,
    media:
      "https://res.cloudinary.com/pandaboogie/image/upload/v1621476915/xupvjnm2ezup1awpqm4k.jpg",
    comments: [],
    created_at: "2021-06-08T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2021-06-09T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2021-06-09T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "panda",
  name: "panda boogie",
  avatar:
    "https://res.cloudinary.com/pandaboogie/image/upload/v1612913898/lznvux7z4vwgohhwvfr6.jpg",
  website: "https://nate-hunter.com",
  email: "panda@panda.com",
  bio: "i'm a panda",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
