import React, { useRef } from 'react';

function GetCard() {
    const ref = useRef();
    return <a href="/api/users/getCard" ref={ref} download />;
}

export default GetCard;
