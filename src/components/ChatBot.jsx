// components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IoMdChatbubbles, IoMdClose, IoMdSend } from 'react-icons/io'
import { FaRobot } from 'react-icons/fa'

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`

const ChatBotButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #009de2;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #007bb8;
  }
`

const ChatWindow = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;

  ${(props) =>
    !props.isOpen &&
    `
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
  `}

  ${(props) =>
    props.isOpen &&
    `
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `}
`

const ChatHeader = styled.div`
  background-color: #009de2;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;

  ${(props) =>
    props.isBot
      ? `
    align-self: flex-start;
    background-color: #f0f0f0;
    border-bottom-left-radius: 5px;
  `
      : `
    align-self: flex-end;
    background-color: #009de2;
    color: white;
    border-bottom-right-radius: 5px;
  `}
`

const ChatInput = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #eee;
`

const InputField = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #009de2;
  }
`

const SendButton = styled.button`
  background-color: #009de2;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const QuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`

const QuickReply = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #e0e0e0;
  }
`

// Helper function to process user messages and generate bot responses
const processMessage = (message) => {
  const lowerMsg = message.toLowerCase()

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    return {
      text: "Hello! I'm the MuleSoft Accelerator Assistant. How can I help you today?",
      quickReplies: ['Convert XSD to RAML', 'WSDL to RAML', 'TIBCO Migration', 'What can you do?'],
    }
  }

  if (lowerMsg.includes('xsd') || lowerMsg.includes('raml')) {
    return {
      text: 'I can help you convert XSD schemas to RAML data types. Would you like to try our XSD to RAML converter?',
      quickReplies: ['Yes, take me there', 'Tell me more about it', 'No thanks'],
    }
  }

  if (lowerMsg.includes('wsdl')) {
    return {
      text: 'Our WSDL to RAML generator can convert your WSDL definitions to RAML specifications. Would you like to use this tool?',
      quickReplies: ["Yes, let's convert WSDL", 'How does it work?', 'No thanks'],
    }
  }

  if (lowerMsg.includes('tibco') || lowerMsg.includes('migration')) {
    return {
      text: 'I can help you migrate from TIBCO to MuleSoft using our migration dashboard. It analyzes your TIBCO components and provides a migration path.',
      quickReplies: ['Open Migration Dashboard', 'Learn more about migration', 'No thanks'],
    }
  }

  if (lowerMsg.includes('what can you do') || lowerMsg.includes('help')) {
    return {
      text: 'I can help you with various MuleSoft design, implementation and migration tasks including: converting XSD to RAML, generating RAML from WSDL, XSLT mapping extraction, TIBCO migration planning and many more.',
      quickReplies: ['XSD to RAML', 'WSDL to RAML', 'XSLT Mapping', 'TIBCO Migration'],
    }
  }

  return {
    text: "I'm not sure I understand. Could you try asking in a different way or select one of our main features?",
    quickReplies: [
      'XSD to RAML Converter',
      'WSDL to RAML Generator',
      'XSLT Mapping Extractor',
      'TIBCO Migration Dashboard',
    ],
  }
}

const ChatBot = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! 👋 I'm your MuleSoft Accelerator Assistant. How can I help you today?",
          isBot: true,
          quickReplies: [
            'What can you do?',
            'Convert XSD to RAML',
            'WSDL to RAML conversion',
            'TIBCO Migration help',
          ],
        },
      ])
    }
  }, [isOpen, messages.length])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message
    const newMessages = [...messages, { text: inputValue, isBot: false }]
    setMessages(newMessages)
    setInputValue('')

    // Process response with slight delay to seem more natural
    setTimeout(() => {
      const response = processMessage(inputValue)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.text, isBot: true, quickReplies: response.quickReplies },
      ])
    }, 600)
  }

  const handleQuickReply = (reply) => {
    // Add user message (the quick reply)
    const newMessages = [...messages, { text: reply, isBot: false }]
    setMessages(newMessages)

    // If it's a navigation request
    if (
      reply === 'Yes, take me there' ||
      reply === 'XSD to RAML Converter' ||
      reply === 'XSD to RAML'
    ) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Taking you to the XSD to RAML converter...', isBot: true },
        ])
        if (navigate) setTimeout(() => navigate('/raml-tools/xsd-to-raml'), 1000)
      }, 500)
      return
    }

    if (
      reply === "Yes, let's convert WSDL" ||
      reply === 'WSDL to RAML Generator' ||
      reply === 'WSDL to RAML' ||
      reply === 'WSDL to RAML conversion'
    ) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Opening the WSDL to RAML generator...', isBot: true },
        ])
        if (navigate) setTimeout(() => navigate('/raml-tools/wsdl-to-raml'), 1000)
      }, 500)
      return
    }

    if (
      reply === 'Open Migration Dashboard' ||
      reply === 'TIBCO Migration Dashboard' ||
      reply === 'TIBCO Migration' ||
      reply === 'TIBCO Migration help'
    ) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Redirecting you to the TIBCO Migration Dashboard...', isBot: true },
        ])
        if (navigate) setTimeout(() => navigate('/migration-tools/tibco'), 1000)
      }, 500)
      return
    }

    if (reply === 'XSLT Mapping Extractor' || reply === 'XSLT Mapping') {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Opening the XSLT Mapping Extractor...', isBot: true },
        ])
        if (navigate) setTimeout(() => navigate('/mapping-tools/xslt-mapping-extractor'), 1000)
      }, 500)
      return
    }

    // Otherwise process as a regular message
    setTimeout(() => {
      const response = processMessage(reply)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.text, isBot: true, quickReplies: response.quickReplies },
      ])
    }, 600)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <ChatBotContainer>
      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <HeaderTitle>
            <FaRobot />
            <h3>MuleSoft Accelerator Assistant</h3>
          </HeaderTitle>
          <CloseButton onClick={toggleChat}>
            <IoMdClose />
          </CloseButton>
        </ChatHeader>

        <ChatMessages ref={messagesRef}>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <Message isBot={message.isBot}>{message.text}</Message>
              {message.isBot && message.quickReplies && (
                <QuickReplies>
                  {message.quickReplies.map((reply, i) => (
                    <QuickReply key={i} onClick={() => handleQuickReply(reply)}>
                      {reply}
                    </QuickReply>
                  ))}
                </QuickReplies>
              )}
            </React.Fragment>
          ))}
        </ChatMessages>

        <ChatInput>
          <InputField
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SendButton onClick={handleSendMessage} disabled={inputValue.trim() === ''}>
            <IoMdSend />
          </SendButton>
        </ChatInput>
      </ChatWindow>

      <ChatBotButton onClick={toggleChat}>
        <IoMdChatbubbles />
      </ChatBotButton>
    </ChatBotContainer>
  )
}

export default ChatBot
