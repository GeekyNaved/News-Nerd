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
  const [page, setPage] = useState(0);
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
          setNbPages(response?.data?.nbPages);
        } else {
          toast.error("No results found.", {
            id: "noResults",
          });
        }
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
    getNews(`${API_URL}query=${query}&page=${page}`);
  }, [page, query]);

  return (
    <div className="min-h-screen px-5 py-5 bg-slate-100 flex flex-col items-center">
      <Search searchValue={query} onSearch={handleSearch} />
      {/* pagination */}
      <div className="flex gap-2 items-center py-5">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page == 0 ? true : false}
          className={
            page == 0
              ? "opacity-20 border-2 border-slate-900 px-4 py-2 rounded-md"
              : "border-2 border-slate-900 px-4 py-2 rounded-md hover:bg-slate-200 transition duration-300"
          }
        >
          Prev
        </button>
        <p>
          {page + 1} of {nbPages}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page == nbPages - 1 ? true : false}
          className={
            page == nbPages - 1
              ? "opacity-20 border-2 border-slate-900 px-4 py-2 rounded-md"
              : "border-2 border-slate-900 px-4 py-2 rounded-md hover:bg-slate-200 transition duration-300"
          }
        >
          Next
        </button>
      </div>
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
