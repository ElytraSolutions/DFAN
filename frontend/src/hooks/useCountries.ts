import { useState, useEffect } from 'react';

export default function useCountries() {
    const [countries, setCountries] = useState<string[]>([]);
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/data/Countries.json');
            const data = await response.json();
            setCountries(data);
        })();
    }, []);
    return countries;
};
