import {useContext} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import {SavedArticlesContext} from "../Context/SavedArticlesContext";

const SidePanel = ({isOpen, onClose, onClearAll}) => {
  const {savedArticles, setSavedArticles} = useContext(SavedArticlesContext);
  const handleRemove = (item) => {
    const savedArticlesAfterRemove = savedArticles.filter(
      (article) => article.title != item.title
    );
    setSavedArticles(savedArticlesAfterRemove);
    localStorage.setItem("Articles", JSON.stringify(savedArticlesAfterRemove));
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-scroll z-50 w-full md:w-1/3 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-5 py-5">
        {savedArticles?.length > 0 ? (
          <button
            className="text-xl underline text-red-600 font-medium"
            onClick={onClearAll}
          >
            Clear All
          </button>
        ) : (
          <button />
        )}

        <button
          className="px-2 py-1 text-4xl rounded hover:bg-gray-200"
          onClick={onClose}
        >
          <AiFillCloseCircle />
        </button>
      </div>
      {savedArticles?.length > 0 ? (
        <ul className="my-5">
          {savedArticles.map((article, key) => (
            <li
              key={key}
              className="flex flex-col py-2 px-4 border-b hover:bg-gray-100"
            >
              <p className="font-medium">{article.title}</p>
              <div className="flex items-center justify-between md:pt-5">
                <button
                  className="underline text-red-600"
                  onClick={() => handleRemove(article)}
                >
                  Remove
                </button>
                <a
                  href={article.url}
                  target="_blank"
                  className="border-2 border-blue-500 self-end rounded px-2 py-1"
                >
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="my-5">
          <p className="text-center text-2xl">No saved articles</p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
