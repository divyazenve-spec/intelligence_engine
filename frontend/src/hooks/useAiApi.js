import { useCallback, useState } from 'react';
import { aiBrief } from '../services/api.js';

// Hook for requesting the AI trend brief. Not used by the compiled bundle.
export function useAiApi() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiBrief(filters);
      setText(res.text);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { text, loading, error, generate };
}
