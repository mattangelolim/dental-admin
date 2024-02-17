import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";

//Hook form
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function MopModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      id: id,
      mop: null,
    },
    mode: "onChange",
  });
  //   const onSubmit = (data) => console.log(data);

  const onSubmit = async (data) => {
    const body = data;
    const body2 = {
      id: data.id,
      approval: "Paid",
    };
    try {
      const response = await axios.post(
        "https://13.211.204.176/update/mop",
        body
      );
      const status = await axios.post(
        "https://13.211.204.176/update/status",
        body2
      );
      handleClose();
      toast.success("Successfully updated.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // console.log(response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data.");
    }
    // console.log(body);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="bg-blue-600 text-white"
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2  font-[Poppins]">
            <div className="flex flex-col">
              <p className="font-bold text-2xl">Set Mode of Payment</p>
              <p className="text-sm">
                Fill all the required inputs to set mode of payment.
              </p>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                // width: "50%",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Controller
                name="mop"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Mode of Payment"
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      style: {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.9rem",
                      },
                    }}
                    error={error !== undefined}
                    helperText={error?.message || ""}
                  />
                )}
              />
              <div className="w-full flex items-center">
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-blue-600 text-white"
                >
                  Update
                </Button>
              </div>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
