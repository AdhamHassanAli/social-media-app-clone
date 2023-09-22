import React, { useState } from "react";
import Instance from "../AxiosInstance/Instance";
import { useMutation } from "@tanstack/react-query";
function FollowButton({ username, following }) {
  const [Followed, setFollowed] = useState(following);
  const Follow = useMutation({
    mutationFn: () => Instance.post(`/profiles/${username}/follow`, {}),
    onSuccess: (data) => {
      console.log(data);
      setFollowed(!Followed);
    },
  });
  const UnFollow = useMutation({
    mutationFn: () => Instance.delete(`/profiles/${username}/follow`, {}),
    onSuccess: (data) => {
      console.log(data);
      setFollowed(!Followed);
    },
  });
  const handleFollow = () => {
    if (!Followed) {
      Follow.mutate();
    } else if (Followed) {
      UnFollow.mutate();
    }
  };

  return (
    <button
      className={
        Followed
          ? "border px-2 rounded-lg bg-[#5CB85C] ml-3"
          : "border px-2 rounded-lg hover:bg-[#5CB85C] ml-3"
      }
      onClick={handleFollow}
    >
      Follow
    </button>
  );
}

export default FollowButton;
