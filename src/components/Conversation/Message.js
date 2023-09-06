import React from 'react'
import { Box, Stack } from "@mui/material"
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MsgTypes";

const Message = () => {
  return (
    <Box p={3}>
        <Stack spacing={3}>
        {Chat_History.map((el) => {
            switch (el.type) {
                case "divider":
                    return <Timeline el={el}/>;
                    //Timeline
                case  "msg":
                    switch(el.subtype){
                        case "img":
                            return <MediaMsg el={el}/>;
                            //img
                        case "doc":
                            //doc
                            return <DocMsg el={el} />
                        case "link":
                            //Link msg
                            return <LinkMsg el={el} />
                        case "reply":
                            return <ReplyMsg el={el}/>
                            //reply msg

                        default: 
                            //text msg
                            return <TextMsg el={el}/>;
                    }
                default:
                    return <></>;
            }
        })}
        </Stack>
    </Box>
  )
}

export default Message
