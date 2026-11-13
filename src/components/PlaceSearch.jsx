import { useState } from 'react';
import usePlaceSearch from '../lib/usePlaceSearch';

// 장소 자동완성 입력. 선택되면 onSelect({lat,lng,text}) 호출. Google Maps APIProvider 안에서 사용.
const PlaceSearch = ({ onSelect, placeholder = 'Search Places ...', className = '' }) => {
  const [value, setValue] = useState('');
  const { suggestions, resolve, clear } = usePlaceSearch(value);

  const pick = async prediction => {
    try {
      const place = await resolve(prediction);
      setValue(place.text);
      clear();
      onSelect(place);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <input
        className={`location-search-input ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={ev => setValue(ev.target.value)}
      />
      {suggestions.length > 0 && (
        <div className='autocomplete-dropdown-container'>
          {suggestions.map(s => (
            <div key={s.placeId} className='suggestion-item' onClick={() => pick(s)}>
              <span>{s.text.text}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlaceSearch;
