import { useEffect, useRef, useState, useCallback } from 'react';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// 스팟 마커를 가까운 것끼리 묶어서 보여준다.
const ClusteredMarkers = ({ spots, onSelect }) => {
  const map = useMap();
  const clusterer = useRef(null);
  const [markers, setMarkers] = useState({});

  useEffect(() => {
    if (!map) return undefined;
    clusterer.current = new MarkerClusterer({ map });
    return () => {
      clusterer.current.clearMarkers();
      clusterer.current.setMap(null);
      clusterer.current = null;
    };
  }, [map]);

  useEffect(() => {
    if (!clusterer.current) return;
    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(Object.values(markers));
  }, [markers, map]);

  const setMarkerRef = useCallback((marker, key) => {
    setMarkers(prev => {
      if ((marker && prev[key]) || (!marker && !prev[key])) return prev;
      if (marker) return { ...prev, [key]: marker };
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  return spots.map(spot => (
    <AdvancedMarker
      key={spot._id}
      position={{ lng: spot.location.coordinates[0], lat: spot.location.coordinates[1] }}
      ref={marker => setMarkerRef(marker, spot._id)}
      onClick={() => onSelect(spot._id)}
    />
  ));
};

export default ClusteredMarkers;
