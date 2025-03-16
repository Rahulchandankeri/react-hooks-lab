import { useCallback, useEffect, useMemo, useState } from 'react';
import { HTTPMethod, IError, IResponse, IUseFetch, IUseFetchReturn } from './types';
import { API_CONFIG, DEFAULT_ERROR_MESSAGE } from './useFetchConfig';

/**
 * @summary A custom React hook to handle API calls in a more organized and manageable way.
 *
 * @description
 * Handles API requests with an organized response structure, better error handling, and loading state management.
 *
 * @param {IUseFetch} params - Parameters for useFetch.
 * @param {string} params.url - API endpoint (relative path).
 * @param {object} [params.payload={}] - Request body for POST/PUT requests.
 * @param {RequestInit} [params.options={}] - Fetch options like method, headers, etc.
 *
 * @returns {Object} An object containing API response, loading state, error object, and refetch function.
 * @returns {boolean} return.loading - Indicates if the request is in progress.
 * @returns {IError} return.error - Contains error status and message if the request fails.
 * @returns {object} return.response - API response data.
 * @returns {Function} return.refetch - Function to manually trigger API call.
 */
const useFetch = ({ url = '', payload = {}, options = {} }: IUseFetch): IUseFetchReturn => {
  const mergedOptions = useMemo(() => options, [options]);
  const { method = HTTPMethod.GET, headers = {}, ...rest } = mergedOptions;

  const [response, setResponse] = useState<IResponse>({
    response: null,
    status: 200,
  });
  const memoizedPayload = useMemo(() => JSON.stringify(payload), [payload]);
  const stableOptions = useMemo(() => JSON.stringify(mergedOptions), [mergedOptions]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    status: 500,
    message: DEFAULT_ERROR_MESSAGE,
  });

  const handleAPIInteraction = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_CONFIG.DEFAULT_API_URL}/${url}`, {
        method,
        headers: {
          ...API_CONFIG.DEFAULT_HEADERS,
          ...headers,
        },
        body: memoizedPayload,
        ...rest,
      });

      if (!resp.ok) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
      const parse = await resp.json();
      const { response = {}, status = 200 } = parse || {};
      setResponse({ response, status });
    } catch (error: any) {
      let statusCode = 500;
      if (typeof error === 'object' && error) {
        statusCode = error?.statusCode || 500;
      }
      setError({
        status: statusCode || 500,
        message: error?.message || '',
      });
    } finally {
      setLoading(false);
    }
  }, [url, stableOptions]);

  const reTrigger = () => {
    handleAPIInteraction();
  };

  useEffect(() => {
    handleAPIInteraction();
  }, [url, options]);

  return {
    loading,
    error,
    response,
    refetch: reTrigger,
  };
};

export default useFetch;
