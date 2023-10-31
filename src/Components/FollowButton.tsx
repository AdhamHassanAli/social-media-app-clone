import React, { useState } from "react";
import Instance from "../AxiosInstance/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { followProfile } from "../api/followProfile";
import { unFollowProfile } from "../api/unFollowProfile";
interface IProps {
  username: string | undefined;
  following: boolean | undefined;
}
function FollowButton({ username, following }: IProps) {
  const [followed, setFollowed] = useState<boolean | undefined>(following);
  const { mutate: followProfileMutation } = useMutation({
    mutationFn: () => followProfile(username),
    onSuccess: () => {
      setFollowed(!followed);
    },
  });
  const { mutate: unFollowProfileMutation } = useMutation({
    mutationFn: () => unFollowProfile(username),
    onSuccess: () => {
      setFollowed(!followed);
    },
  });
  const handleFollow = () => {
    if (!followed) {
      followProfileMutation();
    } else if (followed) {
      unFollowProfileMutation();
    }
  };

  return (
    <button
      className={
        followed
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
