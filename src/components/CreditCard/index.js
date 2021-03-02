
import { useState, useEffect } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './index.scss';
import chip from '../../assets/img/chip.png';
import vendor from '../../assets/img/visa.png';

export default function CreditCard(props) {
    const [state, setState] = useState({});

    useEffect(() => {
        setState({ ...props });
        console.log(props);
    }, [props]);

    return (
        <div className={`cc-container ${props.className}`}>
            <div className={state.showFront ? 'card-flip' : `card-flip hover`}>
                <div className="flip">
                    <div className="front">
                        <CardFront {...state} />
                    </div>
                    <div className="back">
                        <CardBack {...state} />

                    </div>
                </div>
            </div>
        </div>
    );
}

const CardFront = (state) => {
    return (
        <Card>
            <Card.Body className="cc-front">
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
                        state.number?.map(chunk => (
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
                        <p className="font-weight-bold">{state.expiry?.month || 'MM'}/{state.expiry?.year || 'YY'}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

const CardBack = (state) => {
    return (
        <Card>
            <Card.Body className="cc-back">
                <Row className="cc-black-band">
                </Row>
                <Row className="cc-cvv mt-4 font-weight-bold text-right">
                    <Col>
                        <p>cvv</p>
                        <p>{state.cvv?.split('')?.map(no => '*')}</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-right">
                        <Image className="cc-vendor-name" src={vendor} fuild={true} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};