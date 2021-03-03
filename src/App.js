import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import CreditCard from './components/CreditCard';
import CreditCardForm from './components/CreditCardForm';
import './App.css';
import Palette from './components/Palette';

function App() {
  const [state, setState] = useState({
    number: ['xxxx', 'xxxx', 'xxxx', 'xxxx'],
    name: 'Foo Bar',
    expiry: {
      month: null,
      year: null,
    },
    showFront: true,
  });

  const handleFormChange = (name, value) => {
    let data = { expiry: state.expiry };
    if (name === 'month' || name === 'year') {
      data.expiry[name] = value;
    } else {
      data[name] = value;
    }

    setState(state => ({ ...state, ...data }));
    console.log(state);
  };

  const handleFocus = (e) => {
    console.log(e);
    setState(state => ({ ...state, showFront: false }));
  };

  const handleBlur = (e) => {
    console.log(e);
    setState(state => ({ ...state, showFront: true }));
  };

  const handleSelect = (image) => {
    console.log(image);
    setState(state => ({ ...state, image }));
  };

  return (
    <Container className="app" fluid="true">
      <Row className="justify-content-md-center">
        <Col sm={5}>
          <CreditCard
            image={state.image}
            showFront={state.showFront}
            number={state.number}
            name={state.name}
            expiry={state.expiry}
            cvv={state.cvv}
            className="app-cc position-absolute"
          ></CreditCard>
          <CreditCardForm
            className="app-cc-form"
            onChange={handleFormChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></CreditCardForm>
        </Col>
        <Col sm={3} >
          <Palette onSelect={handleSelect}></Palette>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
