import React, { useState } from 'react'
import '../css/textPreview.css'
import config from '../config/config'

const InputComponent = ({ onPromptSubmit }) => {
  const [inputValue, setInputValue] = useState('')
  const [apiResponseState, setApiResponseState] = useState(false)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission
    onPromptSubmit(true) // Reset the API response state
    try {
      const response = await fetch(config.apiUrlPython + '/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ prompt: inputValue }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setApiResponseState('success')
      const Response = {
        result: data['result'],
        filename: data['filename'],
      }
      onPromptSubmit(Response) // Pass the API response to the parent component
    } catch (error) {
      console.error('API request failed:', error)
      // Handle error, e.g., display an error message
    } finally {
      setApiResponseState(false)
    }
  }

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default InputComponent
