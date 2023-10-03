import React from 'react'
import { Box, Stack } from "@mui/material"
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MsgTypes";

const Message = ({menu}) => {
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
                            return <MediaMsg el={el} menu={menu}/>;
                            //img
                        case "doc":
                            //doc
                            return <DocMsg el={el} menu={menu}/>
                        case "link":
                            //Link msg
                            return <LinkMsg el={el} menu={menu}/>
                        case "reply":
                            return <ReplyMsg el={el} menu={menu}/>
                            //reply msg

                        default: 
                            //text msg
                            return <TextMsg el={el} menu={menu}/>;
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
