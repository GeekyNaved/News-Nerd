import {BsBookmarkCheckFill} from "react-icons/bs";
import {BsBookmark} from "react-icons/bs";

const Card = ({title, comments, author, url, isSaved, onSave}) => {
  return (
    <div className="text-left bg-gray-50 shadow-lg px-3 md:px-5 py-5 rounded flex-1">
      <div className="py-2">
        <p className="text-gray-900 md:text-3xl text-2xl font-medium">
          {title}
        </p>
      </div>
      <p className="md:py-1 text-md md:text-xl text-gray-700 leading-8">
        By <span className="font-bold">{author}</span> |{" "}
        <span className="text-xs font-medium">{comments} comments</span>
      </p>
      {url && (
        <div className="flex justify-between items-center pt-4">
          <button className="flex items-center gap-1" onClick={onSave}>
            {isSaved ? (
              <div className="text-2xl">
                <BsBookmarkCheckFill />
              </div>
            ) : (
              <div className="text-2xl">
                <BsBookmark />
              </div>
            )}
            <p className="font-bold md:text-2xl">
              {isSaved ? "saved" : "save"}
            </p>
          </button>
          <div>
            <a
              href={url}
              target="_blank"
              className="border-2 border-slate-900 px-4 py-2 rounded-md hover:bg-slate-200 transition duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
