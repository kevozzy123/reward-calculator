import { useState, useEffect } from 'react';

const base_url = 'http://localhost:3001';

/**
 * Simple custom hook for making a request and handling loading and error states.
 * 
 * @param {string} url - The url string that excludes the base url
 * @param {RequestInit} options - The configuration of fetch request object
 * @returns {{ data: any, isLoading: boolean, error: Error | null}} - The state of the http request
 */
const useRequest = (url, options) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(base_url + url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, isLoading, error };
};

export default useRequest;
