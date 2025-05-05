export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} ${response.statusText}\n${errorText}`);
  }
  return response.json() as T;
};

export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return handleResponse<T>(response);
};
