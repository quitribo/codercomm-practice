import React from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";

function EditForm({ post }) {
  const { isLoading } = useSelector((state) => state.post);

  const defaultValues = {
    id: post._id,
    content: post.content,
    image: null,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    // reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch(editPost(data)).then(() => reset());
    dispatch(editPost(data));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Edit
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditForm;
