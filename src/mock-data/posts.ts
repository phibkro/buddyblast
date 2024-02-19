export interface Post {
  id: string;
  userId: string;
  category: string[];
  postTitle: string;
  postDescription: string;
  rules: string[];
  date_created: string;
  reports: string[];
}
export const posts = [
  {
    id: 1,
    userId: 1,
    category: "comedy",
    title: "Hello world",
    description: "Welcome to the world",
    rules: ["Gjør ditt", "gjør datt"],
    date_created: "07.07.2001",
    reports: [],
    favorites: [],
  },
  {
    id: 2,
    userId: 2,
    category: "drama",
    title: "The Great Adventure",
    description: "Embark on a thrilling journey",
    rules: ["Follow the map", "Trust your instincts"],
    date_created: "10.12.2019",
    reports: [],
    favorites: [],
  },
  {
    id: 3,
    userId: 3,
    category: "action",
    title: "Mission Impossible",
    description: "No task is too daunting",
    rules: ["Think fast", "Act decisively"],
    date_created: "05.03.2020",
    reports: [],
    favorites: [],
  },
  {
    id: 4,
    userId: 1,
    category: "comedy",
    title: "The Pranksters",
    description: "Get ready to laugh until it hurts",
    rules: ["Expect the unexpected", "Keep it light-hearted"],
    date_created: "20.09.2022",
    reports: [],
    favorites: [],
  },
];
