import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function DeleteComment({ comment }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ postId: comment.post, commentId: comment._id }));
    // console.log(comment.post);
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => handleDelete()}>
        <Typography variant="h6">Delete</Typography>
      </IconButton>
    </Stack>
  );
}

export default DeleteComment;
