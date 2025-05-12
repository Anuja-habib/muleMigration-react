import { FiCode, FiUploadCloud, FiDownload } from 'react-icons/fi'

const RAMLExampleGeneratorTexts = {
  title: 'RAML Example Generator',
  subtitle: 'Generate RAML examples for the provided DataType.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Upload',
      description:
        'Drag and drop your datatype files or paste content directly. Supports single and multiple schema files with automatic validation.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Automatically generates data type structures into clean, well-formatted RAML examples with intelligent type mapping and examples.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Download your converted RAML example instantly or copy to clipboard. Includes syntax highlighting and validation for perfect API specifications.',
    },
  ],
}

export { RAMLExampleGeneratorTexts }
