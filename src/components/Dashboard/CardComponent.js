import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from '../FormComponent';
import '../../styles/CardComponent.css';


const CardComponent = ({ data }) => {
  return (
    <div style={{ textDecoration: 'none' }}>
      <div className='Card'>
        <FontAwesomeIcon icon={data.icon} />
        <h2 className='CardHeader' >{data.header}</h2>
        <p className='CardDetails' >{data.details}</p>
        <div className='Form'>
        {data.formId && <FormComponent id={data.formId} />}
        </div>
      </div>
   
    </div>
  );
}


export default CardComponent;
