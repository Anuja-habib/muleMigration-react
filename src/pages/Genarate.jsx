import React, { useState } from 'react'
import InputComponent from '../components/promptInput'
import FileViewer from '../components/FileViewer'

const Generate = () => {
  const [apiData, setApiData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePromptSubmit = (data, err) => {
    if (data === true) {
      // Loading started
      setIsLoading(true)
      setApiData(null)
      setError(null)
    } else if (err) {
      // Error occurred
      setIsLoading(false)
      setError(err)
    } else {
      // Data received
      setIsLoading(false)
      setApiData(data)
    }
  }

  return (
    <div>
      <div>
        <InputComponent onPromptSubmit={handlePromptSubmit} />
        <FileViewer apiResponse={apiData} error={error} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Generate
