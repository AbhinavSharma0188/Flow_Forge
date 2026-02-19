import { useNavigate } from "react-router-dom";





const VideoCard = ({ thumbnail, duration, channelLogo, title, channelName, views, id }) => {
  const navigate = useNavigate()



  return (
    <div className="w-[360px] cursor-pointer" onClick={() => navigate(`/watch-video/${id}`)}>
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-xl w-full h-[200px] border-1 border-gray-800 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex mt-3">
        {/* Channel Logo */}
        <img
          src={channelLogo || null}
          alt={channelName}
          className="w-10 h-10 rounded-full mr-3 object-cover bg-gray-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'%3E%3Cpath fill='%236b7280' d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z'/%3E%3C/svg%3E";
          }}
        />

        {/* Text Content */}
        <div>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{channelName}</p>
          <p className="text-xs text-gray-400">
            {
              Number(views) >= 1_000_000
                ? Math.floor(Number(views) / 1_000_000) + "M"
                : Number(views) >= 1_000
                  ? Math.floor(Number(views) / 1_000) + "K"
                  : Number(views) || 0
            } views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
