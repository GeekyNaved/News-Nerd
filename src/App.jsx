import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";
import {useEffect, useState} from "react";

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
    <div className="min-h-screen px-5 md:p-0 bg-slate-400 flex flex-col items-center justify-center">
      <Search />
      <div className="grid md:grid-cols-2 gap-4 md:max-w-5xl">
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
