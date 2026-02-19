import axios from "axios";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { showCustomAlert } from "../component/CustomAlert";
import { setChannelData } from "../redux/userSlice";

const CreatePost = () => {
  const { channelData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!channelData?._id) {
      showCustomAlert("You need a channel to post! Please create a channel first.");
      return;
    }
    if (!content.trim()) {
      showCustomAlert("Post content is required!");
      return;
    }

    const formData = new FormData();
    formData.append("channelId", channelData?._id);
    formData.append("content", content);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/content/create-post`, formData, {
        withCredentials: true,
      });

      const updatedChannel = {
        ...channelData,
        posts: [...(channelData.posts || []), res.data],
      };
      dispatch(setChannelData(updatedChannel));

      showCustomAlert("Post Published Successfully!");
      setContent("");
      navigate("/")
      setImage(null);
    } catch (error) {
      showCustomAlert(error.response?.data?.message || "Post upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#0f0f0f] text-white flex flex-col pt-5 items-center justify-center">
      <div className="bg-[#212121] p-6 rounded-xl w-full max-w-2xl shadow-lg space-y-4">

        {/* Channel Avatar + Textarea Row */}
        <div className="flex items-start gap-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            {channelData?.avatar ? (
              <img
                src={channelData.avatar}
                alt={channelData.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg border border-gray-600">
                {channelData?.name?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>

          {/* Content Box */}
          <textarea
            placeholder="Write something for your community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#121212] border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none h-28 resize-none"
          />
        </div>

        {/* Image Upload */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <FaImage className="text-2xl text-gray-300" />
          <span className="text-gray-300">Add Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="rounded-lg max-h-64 object-cover"
            />
          </div>
        )}

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium disabled:bg-gray-600 flex items-center justify-center"
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Publish Post"}
        </button>

      </div>
    </div>
  );
};

export default CreatePost;
