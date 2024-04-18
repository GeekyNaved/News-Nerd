import {useEffect, useState} from "react";
import {BsBookmarkCheckFill} from "react-icons/bs";
import {BsBookmark} from "react-icons/bs";
import {IoLogoWhatsapp} from "react-icons/io";

const Card = ({title, comments, author, url, isSaved, onSave}) => {
  const [isMobile, setIsMobile] = useState(Boolean);
  // check user's device is mobile or desktop to open whatsapp app on mobile & whatsapp web in desktops
  useEffect(() => {
    const userAgent = navigator.userAgent || window.opera;
    setIsMobile(
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      )
    );
  }, []);
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
      {isMobile ? (
        <a
          href={`whatsapp://send?text= Please Visit ${url}`}
          rel="nofollow noopener"
          target="_blank"
          className="flex items-center gap-2 mt-2 text-green-700 font-bold"
        >
          <IoLogoWhatsapp />
          Share via Whatsapp
        </a>
      ) : (
        <a
          href={`https://web.whatsapp.com/send?text= Please Visit ${url}`}
          rel="nofollow noopener"
          target="_blank"
          className="flex items-center gap-2 mt-2 text-green-700 font-bold"
        >
          <IoLogoWhatsapp />
          Share via Whatsapp
        </a>
      )}
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
