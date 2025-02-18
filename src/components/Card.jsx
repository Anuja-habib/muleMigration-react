import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FileUpload from '../components/FileUpload';
function CardComp() {
  return (
    <Card style={{ width: '18rem' }}>
      <FileUpload></FileUpload>
    </Card>
  );
}

export default CardComp;