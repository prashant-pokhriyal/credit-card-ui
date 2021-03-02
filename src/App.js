import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import CreditCard from './components/CreditCard';
import CreditCardForm from './components/CreditCardForm';
import './App.css';

function App() {
  const [state, setState] = useState({
    number: ['xxxx', 'xxxx', 'xxxx', 'xxxx'],
    name: 'Foo Bar',
    expiry: {
      month: null,
      year: null,
    },
  });

  const handleFormChange = (name, value) => {
    let data = {};
    if (name === 'month' || name === 'year') {
      data.expiry = {
        ...state.expiry,
        [name]: value,
      };
    } else {
      data[name] = value;
    }

    setState(state => ({ ...state, ...data }));
    console.log(state);
  };

  return (
    <Container className="app" fluid={true}>
      <Row className="justify-content-md-center">
        <CreditCard
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          className="app-cc position-absolute"
        ></CreditCard>
        <Col sm={5}>
          <CreditCardForm className="app-cc-form" onChange={handleFormChange}></CreditCardForm>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
