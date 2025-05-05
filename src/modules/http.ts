export const handleResponse = async <T>(response: Response): Promise<T> => {
  console.log('Response status:', response.status, response.statusText);
  console.log('Response headers:', [...response.headers.entries()]);

  if (!response.ok) {
    const contentType = response.headers.get('Content-Type') || '';
    let errorText = '';

    if (contentType.includes('application/json')) {
      const errorData = await response.json();
      errorText = JSON.stringify(errorData);
    } else {
      errorText = await response.text();
      if (errorText.startsWith('<!DOCTYPE')) {
        errorText = 'Received HTML error page (possibly invalid API key or endpoint)';
      }
    }

    let errorMessage = `Error: ${response.status} ${response.statusText}`;
    if (response.status === 401) {
      errorMessage = 'Invalid API key. Please check your Spoonacular API key.';
    } else if (response.status === 429) {
      errorMessage = 'API rate limit exceeded. Try again later or upgrade your plan.';
    } else if (errorText) {
      errorMessage += `\nDetails: ${errorText}`;
    }

    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('Content-Type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Unexpected response format: Expected JSON');
  }

  const data = await response.json();
  console.log('Parsed response:', data);
  return data as T;
};

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    console.log('Fetching URL:', url);
    const response = await fetch(url);
    return await handleResponse<T>(response);
  } catch (err) {
    console.error('Fetch error:', err);
    throw err instanceof Error ? err : new Error('Network error occurred');
  }
};
