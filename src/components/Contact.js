import {
  Stack, Box, IconButton, Typography, Avatar, Divider, Button, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React from 'react'
import { Bell, CaretRight, Flag, Phone, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app';
import { useDispatch } from 'react-redux';
import { faker } from '@faker-js/faker';
import AntSwitch from "./AntSwitch";
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props, ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this Contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this Chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this Chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}


export const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  }
  const handleCloseDelete = () => {
    setOpenDelete(false);
  }
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
        }}>
          <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} justifyContent="space-between" spacing={3}>
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => {
              dispatch(ToggleSidebar());
            }}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflow: "scroll" }} p={3} spacing={3}>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {'+91 8284890850'}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"}>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">
                Audio
              </Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">
                Voice
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="article">
              About
            </Typography>
            <Typography variant="body2">
              Hey there, I am using
            </Typography>
          </Stack>

          <Divider />

          <Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Typography variant='subtitle2'>
                Media, links and docs
              </Typography>
              <Button onClick={() => {
                dispatch
                  (UpdateSidebarType("SHARED"));
              }} endIcon={<CaretRight />}>
                401
              </Button>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>

          <Divider />

          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Icon>
                <Star size={21} />
              </Icon>
              <Typography variant='subtitle2'>Starred Messages</Typography>
            </Stack>
            <IconButton onClick={() => {
              dispatch
                (UpdateSidebarType("STARRED"));
            }}>
              <CaretRight />
            </IconButton>
          </Stack>

          <Divider />

          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Icon>
                <Bell size={23} />
              </Icon>
              <Typography variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>

          <Divider />

          <Typography variant='body2'>1 group in common</Typography>
          <Stack direction={"row"} alignContent={"center"} spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} />
            <Stack spacing={0.5}>
              <Typography variant='subtitle2'>Camel's Gang</Typography>
              <Typography variant='caption'>Owl, Parrot, Rabit, You</Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button onClick={() => {
              setOpenBlock(true);
            }} startIcon={<Flag />} fullWidth variant='outlined'>
              Block
            </Button>
            <Button onClick={() => {
              setOpenDelete(true);
            }}
              startIcon={<Trash />} fullWidth variant='outlined'>
              Delete
            </Button>
          </Stack>

        </Stack>
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock}/>}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
    </Box>
  )
}

export default Contact