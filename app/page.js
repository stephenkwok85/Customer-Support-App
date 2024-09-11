"use client";

import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Button, Stack, TextField, Avatar, Badge, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { useState } from "react";
import ReactMarkdown from 'react-markdown'
import "./globals.css"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.75)',
      opacity: 0,
    },
  },
}));


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm Rover, your personal AI support assistant. How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage(""); // clear the text field when message is sent
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
    ]);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });
    const data = await response.json();
    setMessages((messages) => [
      ...messages,
      { role: "assistant", content: data.message },
    ]);
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      padding={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={"column"}
        spacing={0.75}
        mb={1}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar sx={{ bgcolor: teal[600], width: 60, height: 60 }} >
            <SupportAgentIcon sx={{ width: 40, height: 40 }} />
          </Avatar>
        </StyledBadge>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h8" component="div">
            Rover AI
          </Typography>
        </Box>
      </Stack>

      {/* message chat container */}
      <Stack
        direction={"column"}
        width="90vw"
        maxWidth={600}
        height="70vh"
        border="1px solid gray"
        borderRadius={5}
        spacing={2}
        p={2}
        display="flex"
      >
        {/* each message bubble */}
        <Stack
          direction={"column"}
          spacing={1.25}
          flexGrow={1}
          overflow="auto"
          maxHeight="100vh"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? teal[600]
                    : "primary.main"
                }
                color="white"
                borderRadius={5}
                maxWidth="80%"
                overflow="auto"
                minHeight="35px"
                pt={1.25}
                pb={1.25}
                pl={2}
                pr={2}
              >
                <ReactMarkdown className="markdown-content">{message.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
        </Stack>
      
        <Stack direction={"row"} spacing={2} height="40px">
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: "50px",
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            sx={{borderRadius: "50px", padding: "0px 25px"}}
            endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
