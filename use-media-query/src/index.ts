import { useEffect, useState } from 'react';

interface HookArgs {
  query: string;
}

type HandlerType = (ev: MediaQueryListEvent) => void;

const useMediaQuery = ({ query }: HookArgs): boolean => {
  const [matchValue, setMatchValue] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matchValue) {
      setMatchValue(media.matches);
    }

    const handler: HandlerType = ({ matches }) => setMatchValue(matches);

    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [matchValue, query]);

  return matchValue;
};

export default useMediaQuery;
