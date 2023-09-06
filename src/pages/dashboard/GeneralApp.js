import { Stack, Box } from '@mui/material';
import Chats from './Chats';
import React from "react";
import Conversation from '../../components/Conversation';
import { useTheme } from '@mui/material/styles';


const GeneralApp = () => {

  const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box sx={{ height: "100%",
       width: "calc(100vw - 420px)",
        backgroundColor: theme.palette.mode ===  "light" ? "#fff" : theme.palette.background.default}}>

        <Conversation />

      </Box>
    </Stack>
  );
};

export default GeneralApp;