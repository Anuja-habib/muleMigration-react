import Card from 'react-bootstrap/Card';
import "../css/card.css"
import { useState } from 'react';
import { Link } from "react-router-dom";
import { CardHeader } from 'react-bootstrap';


const MyCards = ({ CardContent }) => {
    console.log('my card',CardContent)
  return (
<div className='card-container'>

<Link to={CardContent.path} style={{ textDecoration: 'none' }}>

<Card>
      <Card.Body className='card-body'>
        <div className="cardIcons">{CardContent.icon}</div>
        <div className='cardTitle'>{CardContent.title}</div>
       
      </Card.Body>
    </Card>
    </Link>
</div>
  );
}

export default MyCards;

export const ParentCard = ({title,CardContent})=>{
  return (
    <div>
    <div> {title}</div>
    <div>{CardContent}</div>
    </div>
  );

}


export const ParentCards = ({ CardContent }) => {
  console.log('my card',CardContent)
return (

<div className='card-container'>
  {CardContent.map(data =>(
    <Card>
      <h1>{data.Key}</h1>
      {data.Value.map((item , index)=>(
        <MyCards CardContent={item}/>
      ))}
  

    </Card>

  ))}

</div>
);
}