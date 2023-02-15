import React from "react";

export default function useGetAllTodos() {
  const [data, setData] = React.useState<any>(
    undefined as unknown as ResponseType
  );
  const [error, setError] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);

  const run = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await fetch("http://localhost:4000/todos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  return [{ data, error, isLoading }, run];
}
