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

const XSDToRAMLTexts = {
  title: 'XSD to RAML Converter',
  subtitle:
    'Convert your XSD schema to clean, structured RAML definitions for seamless API documentation and development.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Upload',
      description:
        'Upload your XSD files with ease — simply drag and drop or paste the content directly. We support both single and multiple schema files with automatic validation to ensure accuracy.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Our converter automatically generates RAML data type structures from your XSD schema. It ensures a clean, well-formatted RAML output with intelligent type mappings and useful examples to help you get started.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Once your XSD is converted to RAML, download the file instantly or copy it to your clipboard. Our tool also provides syntax highlighting and validation to ensure your RAML is API-ready.',
    },
  ],
}

export { RAMLExampleGeneratorTexts, XSDToRAMLTexts }
