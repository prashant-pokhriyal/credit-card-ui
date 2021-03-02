import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import './index.scss';

export default function CreditCardForm(props) {
    const [state, setState] = useState({ expiry: {} });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'number') {
            value = value.replace(/\s/g, '');
            if (value.length > 16) return;
            value = value.match(/.{1,4}/g) || [''];
            let newValue = value.join('    ');
            setState(state => ({ ...state, [name]: newValue }));
            let appendX = 4 - value[value.length - 1].length;
            while (appendX) {
                value[value.length - 1] += 'x';
                --appendX;
            }
            let appendRemaingX = 4 - value.length;

            while (appendRemaingX) {
                value.push('xxxx');
                --appendRemaingX;
            }
        } else if (name === 'month') {
            value = (parseInt(value)).toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
        } else if (name === 'year') {
            value = value.slice(value.length - 2);
        }
        props.onChange(name, value);
    };

    const handleFocus = (e) => {
        props.onFocus(e);
    };

    const handleBlur = (e) => {
        props.onBlur(e);
    };
    // useEffect(() => {
    //     setState(state => ({ ...state, ...props }));
    // }, [props]);

    // useEffect(() => {
    //     props.handleFormChange(state);
    // }, [state]);

    return (
        <Card className={`${props.className} cc-form`}>
            <Card.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ccNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" placeholder="" size="lg" onChange={handleChange} name="number" value={state.number} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ccHolder">
                            <Form.Label>Card Holder</Form.Label>
                            <Form.Control type="text" placeholder="" size="lg" onChange={handleChange} name="name" value={state.name} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control as="select" defaultValue="Month" size="lg" onChange={handleChange} name="month" value={state.expiry.month}>
                                <option></option>
                                {
                                    [...new Array(12)].map((number, index) => (<option>{index + 1}</option>))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>&nbsp;</Form.Label>
                            <Form.Control as="select" defaultValue="Year" size="lg" onChange={handleChange} name="year" value={state.expiry.year}>
                                <option></option>
                                {
                                    [...new Array(15)].map((number, index) => (<option>{index + 2021}</option>))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="ccHolder">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter CVV"
                                size="lg"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                name="cvv"
                                value={state.cvv} />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" className="cc-form-submit-btn" type="submit" size="lg">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}