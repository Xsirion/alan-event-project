import { useCallback, useEffect, useState } from "react";
import type { Event } from "../models/event.model";

async function sendHttpRequest(url: string, config: RequestInit) {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Request failed!');
    }

    return data;
}

export default function useHttp(url: string, config: RequestInit, initialData: Event[] = []) {
    const [data, setData] = useState<Event[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async function sendRequest(data?: any) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: JSON.stringify(data)});
            setData(resData);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong!');
        }
        setIsLoading(false);
     }, [url, config]);

        useEffect(() => {
            if (config && (config.method === 'GET' || !config.method) || !config) {
                sendRequest();
            }
        }, [sendRequest, config]);

        return {
            data,
            isLoading,
            error,
            sendRequest
        }
        
}