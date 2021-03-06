import { useState } from 'react';
import { Card, Col, Button, Form } from 'react-bootstrap';
import './index.scss';

export default function CreditCardForm(props) {
    const [state, setState] = useState({ cvv: '', number: '', expiry: {} });
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        let error = state.error || {};
        if (form.checkValidity() === false) {
            let list = form.querySelectorAll(':invalid');
            for (let item of list) {
                error[item.name] = 'Required';
            }
        } else {
            props.onSubmit(state);
        }
        setState({ ...state, error });
        setValidated(true);
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let error = state.error || {};
        if (name === 'number') {
            value = value.replace(/\s/g, '');
            if (value && !/^\d+$/.test(value)) {
                return setState(state => ({ ...state, error: { ...error, [name]: `Only digits allowed` } }));
            }
            if (value.length > 16) return;
            value = value.match(/.{1,4}/g) || [''];
            let newValue = value.join('    ');
            setState(state => ({ ...state, [name]: newValue, error: { ...error, [name]: '' } }));
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
        } else if (name === 'cvv') {
            value = value.replace(/\s/g, '');
            debugger;
            if (value && !/^\d+$/.test(value)) {
                return setState(state => ({ ...state, error: { ...error, [name]: `Only digits allowed` } }));
            }
            setState(state => ({ ...state, [name]: value, error: { ...error, [name]: '' } }));
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ccNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                size="lg"
                                onChange={handleChange}
                                isInvalid={state.error?.number}
                                name="number"
                                required
                                value={state.number} />
                            <Form.Control.Feedback type="invalid">{state.error?.number}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="ccHolder">
                            <Form.Label>Card Holder</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                size="lg"
                                onChange={handleChange}
                                // isInvalid={submitted && !state.error?.name}
                                required
                                name="name"
                                value={state.name} />
                            <Form.Control.Feedback type="invalid">{state.error?.name}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} xs={6} sm={4} controlId="formGridState">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control
                                as="select"
                                size="lg"
                                onChange={handleChange}
                                // isInvalid={validated && state.error?.month}
                                required
                                name="month"
                                value={state.expiry.month}>
                                <option hidden value="">Month</option>
                                {
                                    [...new Array(12)].map((number, index) => (<option>{index + 1}</option>))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{state.error?.month}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={6} sm={4} controlId="formGridState">
                            <Form.Label>&nbsp;</Form.Label>
                            <Form.Control
                                as="select"
                                size="lg"
                                onChange={handleChange}
                                // isInvalid={validated && state.error?.year}
                                required
                                name="year"
                                value={state.expiry.year}>
                                <option hidden value="">Year</option>
                                {
                                    [...new Array(15)].map((number, index) => (<option>{index + 2021}</option>))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{state.error?.year}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} sm={4} controlId="ccHolder">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter CVV"
                                size="lg"
                                required
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                name="cvv"
                                isInvalid={state.error?.cvv}
                                value={state.cvv} />
                            <Form.Control.Feedback type="invalid">{state.error?.cvv}</Form.Control.Feedback>
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