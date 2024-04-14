import {BsBookmarkStarFill} from "react-icons/bs";

const Card = ({title, comments, author, url}) => {
  return (
    <div className="text-left bg-gray-50 shadow-lg px-3 md:px-5 py-2 rounded flex-1">
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
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-1">
            <BsBookmarkStarFill />
            <p className="font-bold">save</p>
          </button>
          <div className="py-3">
            <a
              href={url}
              target="_blank"
              className="bg-gradient-to-r from-cyan-500 text- to-teal-500 text-white px-4 py-2 border-none rounded-md"
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
