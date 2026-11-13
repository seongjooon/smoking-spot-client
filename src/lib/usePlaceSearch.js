import { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

// Places API (New) 기반 자동완성. 선택하면 { lat, lng, text } 를 돌려준다.
export default function usePlaceSearch(input) {
  const places = useMapsLibrary('places');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!places || input.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({ input });
        if (!cancelled) setSuggestions(res.suggestions.map(s => s.placePrediction));
      } catch (err) {
        console.error(err);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [places, input]);

  const resolve = async prediction => {
    const place = prediction.toPlace();
    await place.fetchFields({ fields: ['location'] });
    return {
      lat: place.location.lat(),
      lng: place.location.lng(),
      text: prediction.text.text
    };
  };

  return { suggestions, resolve, clear: () => setSuggestions([]) };
}
