import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function PaymentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: null,
      mode: null,
      status: null,
      amount: null,
    },
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="bg-blue-600 text-white"
      >
        Add Data
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-8  font-[Poppins]">
            <div className="flex flex-col">
              <p className="font-bold text-2xl">Add Payment Data</p>
              <p className="text-sm">
                Fill all the required inputs to add payment data.
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Name"
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
              <Controller
                name="mode"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Mode of payment is required",
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
              <Controller
                name="status"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Status is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Payment Status"
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
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Amount is required",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Amount"
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
                  Add
                </Button>
              </div>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
