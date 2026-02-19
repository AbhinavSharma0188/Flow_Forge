import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../utils/formatTime";

const ShortsCard = ({ shortUrl, title, channelName, avatar, views, id, createdAt }) => {
  const navigate = useNavigate()
  return (
    <div className="w-45 sm:w-48 cursor-pointer relative" onClick={() => navigate(`/watch-short/${id}`)
    }>
      {/* Video box */}
      <div className="rounded-xl overflow-hidden bg-black w-full h-70 border-1 border-gray-700">
        <video
          src={shortUrl}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Info */}
      <div className="mt-2 space-y-2 w-full absolute bottom-0 p-3 bg-[#00000031] rounded-xl">
        <h3 className="text-sm font-semibold text-white line-clamp-2 ">
          {title}
        </h3>
        <div className="flex items-center justify-start gap-1">
          {avatar ? (
            <img
              src={avatar}
              className="w-4 h-4 rounded-full object-cover"
              alt=""
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.fallback-icon-card').style.display = 'flex';
              }}
            />
          ) : (
            <div className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-[8px] uppercase text-white">{channelName?.charAt(0) || "?"}</span>
            </div>
          )}
          <div className="fallback-icon-card hidden w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-[8px] uppercase text-white">{channelName?.charAt(0) || "?"}</span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-1">{channelName}</p>
        </div>

        <p className="text-xs text-gray-400">{
          Number(views) >= 1_000_000
            ? Math.floor(Number(views) / 1_000_000) + "M"
            : Number(views) >= 1_000
              ? Math.floor(Number(views) / 1_000) + "K"
              : Number(views) || 0
        } views • {formatTimeAgo(createdAt)}</p>
      </div>
    </div>
  );
};

export default ShortsCard;
