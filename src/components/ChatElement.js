import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import StyledBadge from "./StyledBadge";


const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: "100%",
            height: 75,
            borderRadius: 1,
            backgroundColor: theme.palette.mode === "light" ? "#FFF" : theme.palette.background.paper,
        }} p={2}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction="row" spacing={2}>
                    {online ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge> : <Avatar src={faker.image.avatar()} />}
                    <Stack direction="column" spacing={0.3}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                        <Typography variant="caption">
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="column" alignItems={"center"} spacing={2}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}>

                    </Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ChatElement