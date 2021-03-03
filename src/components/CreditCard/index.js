
import { useState, useEffect } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './index.scss';
import chip from '../../assets/img/chip.png';
import amex from '../../assets/img/amex.png';
import dinersclub from '../../assets/img/dinersclub.png';
import discover from '../../assets/img/discover.png';
import jcb from '../../assets/img/jcb.png';
import mastercard from '../../assets/img/mastercard.png';
import troy from '../../assets/img/troy.png';
import unionpay from '../../assets/img/unionpay.png';
import visa from '../../assets/img/visa.png';

export default function CreditCard(props) {
    const [state, setState] = useState({});
    const [vendor, setVendor] = useState(null);

    const regexMapping = [
        {
            image: amex,
            regex: /^(3[47])\d+$/,
        },
        {
            image: dinersclub,
            regex: /^3(?:0[0-5]|[68][0-9])\d+$/,
        },
        {
            image: discover,
            regex: /^6\d+$/,
        },
        {
            image: jcb,
            regex: /^(2131|1800|35)\d*$/
        },
        {
            image: mastercard,
            regex: /^(5[1-5][0-9])\d+$/,
        },
        {
            image: troy,
            regex: /^(9792)\d*$/,
        },
        {
            image: unionpay,
            regex: /^(62|88)\d+$/,
        },
        {
            image: visa,
            regex: /^(4)\d+$/,
        },
    ];

    const getCardType = (number) => {
        for (let card of regexMapping) {
            if (card.regex.test(number)) {
                return card.image;
            }
        }

        return regexMapping[regexMapping.length - 1].image;
    };

    useEffect(() => {
        setState({ ...props });
        console.log(props);
    }, [props]);

    useEffect(() => {
        debugger;
        if (state.number)
            setVendor(getCardType(state.number[0]));
    }, [state.number]);

    return (
        <div className={`cc-container ${props.className}`}>
            <div className={state.showFront ? 'card-flip' : `card-flip hover`}>
                <div className="flip">
                    <div className="front">
                        <CardFront {...state} vendor={vendor} />
                    </div>
                    <div className="back">
                        <CardBack {...state} vendor={vendor} />

                    </div>
                </div>
            </div>
        </div>
    );
}

const CardFront = (state) => {
    return (
        <Card style={{ backgroundImage: `url(${state.image})` }}>
            <Card.Body className="cc-front">
                <Row>
                    <Col>
                        <Image className="cc-chip" src={chip} fuild={true} />
                    </Col>
                    <Col className="text-right">
                        <Image key={state.vendor} className="cc-vendor-name slide-down" src={state.vendor} fuild={true} />
                    </Col>
                </Row>
                <Row className="cc-number mt-5 font-weight-bold">
                  {
                        state.number?.map(chunk => (
                            <Col>
                                {
                                    chunk.split('').map(digit => (
                                        <div className="digit">
                                            <div className={digit === 'x' ? 'digit-container slide-up' : 'digit-container slide-down'}>{digit === 'x' ? '#' : digit}</div>
                                        </div>
                                    ))
                                }
                            </Col>
                        ))
                    }
                </Row>
                <Row className="mt-5 cc-last-row">
                    <Col>
                        <span className="small">Card Holder</span>
                        <p className="font-weight-bold">{state.name}</p>
                    </Col>
                    <Col className="text-right">
                        <span className="small">Expires</span>
                        <p className="font-weight-bold cc-expiry">
                            {state.expiry?.month ?
                                <span key={state.expiry.month} className="slide-down">{state.expiry.month}</span>
                                :
                                <span className="slide-down">MM</span>
                            }
                            /
                            <span key={state.expiry?.year} className="slide-down">{state.expiry?.year ?? 'YY'}</span>
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

const CardBack = (state) => {
    return (
        <Card style={{ backgroundImage: `url(${state.image})` }}>
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
                        <Image className="cc-vendor-name" src={state.vendor} fuild={true} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};