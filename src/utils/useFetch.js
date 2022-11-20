import useSWR from 'swr';

export function useFetch(key, options) {
  const fetcher = () =>
    fetch(process.env.REACT_APP_API_URL + key).then((res) => res.json());

  const { data, error } = useSWR(key, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
