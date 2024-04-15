import {AiFillCloseCircle} from "react-icons/ai";

const SidePanel = ({isOpen, onClose, savedArticles}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-scroll z-50 w-full md:w-1/3 bg-white shadow-lg transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 px-2 py-1 text-2xl rounded hover:bg-gray-200"
        onClick={onClose}
      >
        <AiFillCloseCircle />
      </button>
      <ul className="my-10">
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
    </div>
  );
};

export default SidePanel;
