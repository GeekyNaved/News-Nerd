import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";
import {useEffect, useState} from "react";
import Loader from "react-js-loader";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [query, setQuery] = useState("");
  const [nbPages, setNbPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://hn.algolia.com/api/v1/search?";

  const getNews = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        // console.log("response", response?.data?.hits);
        if (response?.data?.hits?.length > 0) {
          setNewsData(response?.data?.hits);
        } else
          toast.error("No results found.", {
            id: "noResults",
          });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong. Please try again.", {
          id: "catchBlock",
        });
        console.log("error", error);
      });
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getNews(`${API_URL}query=${query}&page=${nbPages}`);
  }, [nbPages, query]);

  return (
    <div className="min-h-screen px-5 md:p-0 bg-slate-100 flex flex-col items-center">
      <Search searchValue={query} onSearch={handleSearch} />
      {isLoading ? (
        <div>
          <Loader
            type="spinner-cub"
            bgColor="#0a1628"
            color="#0a1628"
            size={100}
          />
        </div>
      ) : (
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
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable={false}
        pauseOnHover
        theme="dark"
        // className="custom-toast"
      />
    </div>
  );
}

export default App;
