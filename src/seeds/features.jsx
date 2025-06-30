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
const MuleAppGenerator = {
  title: 'Mule Application Generator',
  subtitle:
    'Generate Mule applications from your prompts for seamless API integration and development.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Upload',
      description:
        'Upload your project files with ease — simply drag and drop or paste the content directly. We support both single and multiple files with automatic validation to ensure accuracy.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Our generator automatically creates Mule applications based on your prompts. It ensures a well-structured output with intelligent mappings and useful examples to help you get started.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Once your Mule application is generated, download the file instantly or copy it to your clipboard. Our tool also provides syntax highlighting and validation to ensure your application is ready for deployment.',
    },
  ],
}

const WSDLToRAMLTexts = {
  title: 'WSDL to RAML Converter',
  subtitle:
    'Convert your WSDL schema to clean, structured RAML definitions for seamless API documentation and development.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Upload',
      description:
        'Upload your WSDL files with ease — simply drag and drop or paste the content directly. We support both single and multiple schema files with automatic validation to ensure accuracy.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Our converter automatically generates RAML data type structures from your WSDL schema. It ensures a clean, well-formatted RAML output with intelligent type mappings and useful examples to help you get started.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Once your WSDL is converted to RAML, download the file instantly or copy it to your clipboard. Our tool also provides syntax highlighting and validation to ensure your RAML is API-ready.',
    },
  ],
}

const JSONToRAMLTexts = {
  title: 'JSON to RAML Datatype Converter',
  subtitle:
    'Convert your JSON example to clean, structured RAML datatypes for seamless API documentation and development.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Upload',
      description:
        'Upload your JSON files with ease — simply drag and drop or paste the content directly. We support both single and multiple schema files with automatic validation to ensure accuracy.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Our converter automatically generates RAML data type structures from your JSON example. It ensures a clean, well-formatted RAML output with intelligent type mappings and useful examples to help you get started.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Once your JSON example is converted to RAML datatype, download the file instantly or copy it to your clipboard. Our tool also provides syntax highlighting and validation to ensure your RAML is API-ready.',
    },
  ],
}

const DataweaveGeneratorTexts = {
  title: 'Dataweave Code Generator',
  subtitle:
    'Generate Dataweave transformation code from your input data and expected output format.',
  features: [
    {
      icon: <FiUploadCloud />,
      title: 'Easy Input',
      description:
        'Paste your input data and expected output format directly. We support JSON, XML, and other data formats with automatic validation to ensure accuracy.',
    },
    {
      icon: <FiCode />,
      title: 'Smart Generation',
      description:
        'Our generator automatically creates Dataweave transformation code based on your input and expected output. It ensures clean, well-formatted code with intelligent mappings and best practices.',
    },
    {
      icon: <FiDownload />,
      title: 'Instant Export',
      description:
        'Once your Dataweave code is generated, download the .dwl file instantly or copy it to your clipboard. Our tool provides syntax highlighting and validation to ensure your code is ready for use.',
    },
  ],
}

export { RAMLExampleGeneratorTexts, XSDToRAMLTexts, WSDLToRAMLTexts, JSONToRAMLTexts, MuleAppGenerator, DataweaveGeneratorTexts }
