import { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import './index.scss';

export default function Palette(props) {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(21);

    const handleClick = (index) => {
        setSelectedImage(index);
        props.onSelect(images[index]);
    };

    useEffect(() => {
        const promises = [];
        for (let i = 1; i < 25; i++) {
            let promise = import(`../../assets/img/${i}.jpeg`).then(image => image);
            promises.push(promise);
        }
        Promise.allSettled(promises)
            .then(results => results.map(result => result.value.default))
            .then(images => {
                setImages(images);
                props.onSelect(images[21]);
            });
    }, []);

    return (
        <Row className="app-palette">
            {
                images.map((image, index) => (
                    <Col sm={3} key={index} onClick={e => handleClick(index)} className="mb-2 p-1">
                        <div>
                            <Image src={image} thumbnail className={selectedImage === index ? 'bg-primary' : ''}/>
                        </div>
                    </Col>
                ))
            }
        </Row>
    );
}