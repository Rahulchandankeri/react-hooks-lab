import './App.css';

const data = [
  {
    id: 0,
    title: 'useFetch',
    description:
      'Handles API requests with an organized response structure, better error handling, and loading state management.',
  },
  {
    id: 1,
    title: 'useDebounce',
    description: 'Debounces/delays function execution',
  },
];
function App() {
  return (
    <div>
      <h1>React hooks</h1>

      <ul className="card">
        {data.map((item) => {
          const { id = 0, title = '', description = '' } = item || {};
          return (
            <li key={id} className="read-the-docs">
              {title} - {description}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
