import React, { useState } from 'react'
import '../css/ListComponent.css'
import { Oval } from 'react-loader-spinner'
import config from '../config/config' // Import your config
import yaml from 'js-yaml'
function ListComponent({ items }) {
  const [apiEndpoint, setApiEndpoint] = useState(config.apiUrlPython + '/convert')
  const [downloadLinks, setDownloadLinks] = useState({})
  const [loadingStates, setLoadingStates] = useState({})

  const extractFilename = (filePath) => {
    if (!filePath) {
      return ''
    }
    const pathParts = filePath.split('/')
    return pathParts[pathParts.length - 1]
  }

  const handleConvertClick = async (item) => {
    const itemId = item.path
    setLoadingStates((prevStates) => ({ ...prevStates, [itemId]: true }))

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: item.path }),
      })

      if (!response.ok) {
        throw new Error('Conversion failed.')
      }

      // Assuming the API returns the converted RAML data in the response
      const data = await response.text()
      handleDownload(data, itemId) // Initiate download
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [itemId]: false }))
    }
  }
  const jsonToYaml = (jsonData) => {
    const parsedYaml = yaml.load(jsonData).result
    return yaml.dump(parsedYaml, { indent: 2 })
  }
  const handleDownload = (data, itemId) => {
    const ramlData = data // Extract the result node

    // Convert JSON to YAML
    const yamlData = jsonToYaml(ramlData)

    const blob = new Blob([yamlData], { type: 'text/raml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', extractFilename(itemId) + '.raml')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="list-component">
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Component Name</th>
            <th>Description</th>
            <th>Dependency</th>
            <th>Complexity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items && Array.isArray(items) ? (
            items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{extractFilename(item.path)}</td>
                <td>{item.path || 'No description available.'}</td>
                <td>{item.dependency || 'No dependencies found.'}</td>
                <td>{item.complexity || 'Complexity not assessed.'}</td>
                <td>
                  {loadingStates[item.path] ? (
                    <Oval color="#007bff" height={20} width={20} />
                  ) : downloadLinks[item.path] ? (
                    <a
                      href={downloadLinks[item.path]}
                      download={extractFilename(item.path) + '.raml'}
                    >
                      Download
                    </a>
                  ) : (
                    <button onClick={() => handleConvertClick(item)}>Convert</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No items to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ListComponent
