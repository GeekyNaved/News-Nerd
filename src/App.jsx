import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";
import {useEffect, useState} from "react";

const dummyNews = [
  {
    id: 1,
    title: "Neutrelle is going to be hacked",
    author: "siza",
    url: "https://google.com",
    comment: "4",
  },
  {
    id: 1,
    title: "iFileVAT not gonna be completed anyway",
    author: "naved",
    url: "https://google.com",
    comment: "2",
  },
  {
    id: 1,
    title: "MacTassos not going to be delivered by the end of this year",
    author: "amaan",
    url: "https://google.com",
    comment: "18",
  },
];
function App() {
  const [newsData, setNewsData] = useState([]);
  const API_URL = "http://hn.algolia.com/api/v1/search?";

  const getNews = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setNewsData(response?.data?.hits);
        console.log("response", response?.data?.hits);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="min-h-screen px-5 text-center bg-slate-500">
      <Search />
      <div className="grid md:grid-cols-2 gap-4">
        {newsData?.map((item, key) => {
          return (
            <Card
              key={key}
              author={item.author}
              title={item.title}
              comments={item.num_comments}
              url={item.url}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
