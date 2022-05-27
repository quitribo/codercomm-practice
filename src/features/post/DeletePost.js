import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

function DeletePost({ post }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost({ postId: post._id }));
    // console.log(post._id);
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleDelete()}>
        <Typography variant="h6">Delete</Typography>
      </IconButton>
    </Stack>
  );
}

export default DeletePost;
