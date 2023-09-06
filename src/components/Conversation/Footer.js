import React from 'react'
import { Stack, Box, IconButton , TextField, InputAdornment} from '@mui/material'
import { useTheme, styled } from "@mui/material/styles"
import { LinkSimple, PaperPlaneTilt, Smiley} from 'phosphor-react';


const StyledInput = styled(TextField)(({theme})=>({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    }
}));

const Footer = () => {
    const theme = useTheme();
  return (
    <Box p={2} sx={{ width: "100%",
             backgroundColor: theme.palette.mode ===  "light" ? "#FBFAFF" : theme.palette.background.paper,
              boxShadow: "0px 0px 2px rgba(0, 0, 0.25)" }}>
                <Stack direction="row" alignItems={"center"} spacing={3}>
                    <StyledInput fullWidth placeholder="Write a message..." variant='filled' InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment>
                            <IconButton>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    ,
                    endAdornment: <InputAdornment>
                    <IconButton>
                        <Smiley />
                    </IconButton>
                    </InputAdornment>
                    }}
                />
                <Box sx={{height:48, width:48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
                    <Stack sx={{height:"100%", width: "100%"}} alignItems="center" justifyContent={"center"}>
                    <IconButton>
                        <PaperPlaneTilt color="#FFF"/>
                    </IconButton>
                    </Stack>
                </Box>
                </Stack>
            </Box>
  )
}

export default Footer
