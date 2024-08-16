import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DataFetcher({ url, children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return children(data);
}
