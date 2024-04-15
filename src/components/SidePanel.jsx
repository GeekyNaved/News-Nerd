import {AiFillCloseCircle} from "react-icons/ai";

const SidePanel = ({isOpen, onClose, onClearAll, savedArticles}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-scroll z-50 w-full md:w-1/3 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-5 py-5">
        {savedArticles?.length > 0 ? (
          <button
            className="px-2 py-1 text-xl rounded hover:bg-gray-200"
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
              {/* <p className="border-2 border-blue-500 rounded px-2 py-1">Remove</p> */}

              <a
                href={article.url}
                target="_blank"
                className="border-2 border-blue-500 self-end rounded px-2 py-1"
              >
                Read more
              </a>
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
