export interface Post {
  userId: string;
  category: string;
  postTitle: string;
  postDescription: string;
  rules: string[];
  creationDate: string;
  reportCount: string[];
  favorites: string[];
  defaultTime: number;
}
//note Date type need american format MM/DD/YYYY
export const posts = [
  {
    userId: "Ola",
    category: "outdoors",
    postTitle: "Hello world",
    postDescription: "Welcome to the world",
    rules: ["Gjør ditt", "gjør datt"],
    creationDate: new Date("07.07.2001"),
    reportCount: 0,
    favorites: ["oops"],
    defaultTime: 120,
  },
  {
    userId: "Kari",
    category: "outdoors",
    postTitle: "The Great Adventure",
    postDescription: "Embark on a thrilling journey",
    rules: ["Follow the map", "Trust your instincts"],
    creationDate: new Date("10.12.2019"),
    reportCount: 0,
    favorites: [],
    defaultTime: 300,
  },
  {
    userId: "Sysiphus",
    category: "indoors",
    postTitle: "Mission Impossible",
    postDescription: "No task is too daunting",
    rules: ["Think fast", "Act decisively"],
    creationDate: new Date("05.03.2020"),
    reportCount: 0,
    favorites: [],
    defaultTime: 60,
  },
  {
    userId: "Sherman",
    category: "cards",
    postTitle: "The Pranksters",
    postDescription: "Get ready to laugh until it hurts",
    rules: ["Expect the unexpected", "Keep it light-hearted"],
    creationDate: new Date("09.20.2022"),
    reportCount: 0,
    favorites: [],
    defaultTime: 180,
  },
];
