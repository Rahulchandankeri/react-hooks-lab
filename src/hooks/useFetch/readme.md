# useFetch Hook Requirements Achieved

## Requirements

1. **Memoization for Performance Optimization**
   - `useMemo` is used for memoizing `payload` and `options` to prevent unnecessary re-renders.
2. **State Management for API Response**
   - `useState` manages `response`, `loading`, and `error` states.
3. **Dynamic API URL Support**

   - Uses `API_CONFIG.DEFAULT_API_URL` for base URL, making it configurable.

4. **Dynamic HTTP Method & Headers**

   - Extracts `method` and `headers` from `options`, ensuring flexibility.

5. **Error Handling**

   - Catches errors and sets appropriate `error` state.

6. **Reusable & Customizable**

   - Accepts `url`, `payload`, and `options` for different API calls.

7. **Automatic API Call on Dependency Change**

   - `useEffect` triggers API call when `url` or `options` change.

8. **Manual API Refetching**

   - Provides `refetch` function to manually trigger API calls.

9. **Default Error Message Handling**
   - Uses `DEFAULT_ERROR_MESSAGE` as fallback.

## Summary

The `useFetch` hook effectively handles API calls with dynamic configurations, error management, and reusability, making it a scalable solution for API interactions in React applications.
