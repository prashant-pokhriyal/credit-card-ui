
import { useState, useEffect } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './index.scss';
import chip from '../../assets/img/chip.png';
import vendor from '../../assets/img/visa.png';

export default function CreditCard(props) {
    const [state, setState] = useState({
        number: [],
        name: 'Foo Bar',
        expiry: {
            month: null,
            year: null,
        }
    });

    useEffect(() => {
        setState({ ...props });
    }, [props]);

    return (
        <Card className={`cc-container ${props.className}`}>
            <Card.Body>
                <Row>
                    <Col>
                        <Image className="cc-chip" src={chip} fuild={true} />
                    </Col>
                    <Col className="text-right">
                        <Image className="cc-vendor-name" src={vendor} fuild={true} />
                    </Col>
                </Row>
                <Row className="cc-number mt-5 font-weight-bold">
                    {
                        state.number.map(chunk => (
                            <Col>
                                <p>{chunk}</p>
                            </Col>
                        ))
                    }
                </Row>
                <Row className="mt-4">
                    <Col>
                        <span>Card Holder</span>
                        <p className="font-weight-bold">{state.name}</p>
                    </Col>
                    <Col className="text-right">
                        <span>Expires</span>
                        <p className="font-weight-bold">{state.expiry.month || 'MM'}/{state.expiry.year || 'YY'}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}