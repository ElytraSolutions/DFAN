import { useState, useEffect } from 'react';

export default function useStates() {
    const [states, setStates] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/data/States.json');
            const data = await response.json();
            setStates(data);
        })();
    }, []);
    return states;
}
