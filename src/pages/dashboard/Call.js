import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { Link } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import { CallLogElement } from '../../components/CallElement';
import { CallLogs } from '../../data';
import StartCall from '../../sections/main/StartCall';
import { useState } from 'react';

const Call = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
      }
  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} sx={{width: "100%"}}>
        <Box sx={{height: "100vh", 
        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
        width: 320,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
        }}>
            {/* All the elements of call the box are put into stack for better organisation */}
            <Stack p={3} spacing={2} sx={{maxHeight: "100vh"}}>
                <Stack>
                    <Typography variant="h5">Call Logs</Typography>
                </Stack>

                <Stack sx={{width:"100%"}}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                    </Search>
                </Stack>
               
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="subtitle2" component={Link}>
                        Start Conversation
                    </Typography>
                    <IconButton onClick={() => {
                        setOpenDialog(true);
                    }}>
                        <Plus style={{color: theme.palette.primary.main}}/>    
                    </IconButton>
                </Stack>

                <Divider/>

                <Stack spacing={3} sx={{flexGrow: 1, overflowY: "scroll", height: "100%"}}>
                    {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}

                        <Stack spacing={2.5}>
                            {/* Call Logs */}
                            {CallLogs.map((el) => <CallLogElement {...el} />)}

                        </Stack>

                    {/* </SimpleBarStyle> */}
                </Stack>

            </Stack>

        </Box>
    </Stack>

    {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  );
}

export default Call