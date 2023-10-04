import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormComponent from '../FormComponent';

const Card = styled.div`
  width: 32em;
  height: 30em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fefefe;
  padding: 20px;
  margin: 20px; 
 
`;
const CardHeader = styled.h2`
  font-size: 0.9em;      // This makes the header slightly larger.
  font-weight: bold;     // This makes the header bold.
  margin-bottom: 10px;   // Optional: Add some space below the header.
  // Add any other styles you want for the header.
`;

const CardDetails = styled.p`
font-size: 0.7em;
  font-weight: 300;     // This sets the font weight to light.

`;
const Form = styled.div`
  margin-top: 5em;
`;

const CardComponent = ({ data }) => {
  return (
    <div style={{ textDecoration: 'none' }}>
      <Card>
        <FontAwesomeIcon icon={data.icon} />
        <CardHeader>{data.header}</CardHeader>
        <CardDetails>{data.details}</CardDetails>
        <Form>
        {data.formId && <FormComponent id={data.formId} />}
        </Form>
      </Card>
   
    </div>
  );
}


export default CardComponent;
