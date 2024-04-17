import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";
import {useContext, useEffect, useState} from "react";
import Loader from "react-js-loader";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from "./components/SidePanel";
import {
  SavedArticlesContext,
} from "./Context/SavedArticlesContext";

function App() {
  const {savedArticles, setSavedArticles} = useContext(SavedArticlesContext);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [query, setQuery] = useState("");
  const [nbPages, setNbPages] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "https://hn.algolia.com/api/v1/search?";

  const getNews = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        if (response?.data?.hits?.length > 0) {
          // getting articles which has title or hiding articles which has no title
          const articlesWithTitle = response?.data?.hits?.filter(
            (news) => news.title
          );
          setNewsData(articlesWithTitle);
          // setSavedArticles(response?.data?.hits);
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
    setPage(0);
  };

  const handleClearAllArticles = () => {
    setSavedArticles([]);
    localStorage.clear("Articles");
  };
  const handleSave = (item) => {
    const isExist = savedArticles.some(
      (savedItem) => savedItem.title == item.title
    );
    const updatedSavedArticles = isExist
      ? savedArticles.filter((article) => article.title != item.title)
      : [...savedArticles, item];
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("Articles", JSON.stringify(updatedSavedArticles));
  };

  // for search
  useEffect(() => {
    // debounce function - to improve search performance
    let timerOut = setTimeout(() => {
      getNews(`${API_URL}query=${query}&page=${page}`);
    }, 800);
    return () => clearTimeout(timerOut);
  }, [query]);

  // for pagination
  useEffect(() => {
    getNews(`${API_URL}query=${query}&page=${page}`);
  }, [page]);

  useEffect(() => {
    const existedArticles = JSON.parse(localStorage.getItem("Articles"));
    if (existedArticles != null || existedArticles?.length == 0)
      setSavedArticles(existedArticles);
  }, []);

  return (
    <div className="min-h-screen px-5 py-5 bg-slate-100 flex flex-col items-center">
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        onClearAll={handleClearAllArticles}
        savedArticles={savedArticles}
      />
      <h1 className="text-4xl font-bold">News Nerd</h1>
      <div className="my-5 md:w-1/4">
        <Search searchValue={query} onSearch={handleSearch} />
      </div>
      <button
        className="text-blue-600 py-2 text-xl"
        onClick={() => setIsSidePanelOpen(true)}
      >
        View Saved News
      </button>
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
                isSaved={savedArticles.some(
                  (article) => article.title == item.title
                )}
                onSave={() => handleSave(item)}
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
