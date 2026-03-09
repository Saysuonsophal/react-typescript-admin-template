// Define type
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

// Fake data
export const users: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "sara@example.com",
    role: "Manager",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "mike@example.com",
    role: "user",
  },
];
