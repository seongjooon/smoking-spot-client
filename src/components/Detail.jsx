import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Detail.scss';

import Stars from './Stars';
import PlusIcon from './plus-icon.png';
import SearchIcon from './search-icon.png';
import { fetchSpotDetail, fetchComents, addComent, clearDetail } from '../store';

export const average = list =>
  list.length ? list.reduce((acc, c) => acc + c.rate, 0) / list.length : 0;

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedSpot: spot, coments, error } = useSelector(s => s);
  const [rate, setRate] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(fetchSpotDetail(id));
    dispatch(fetchComents(id));
  }, [dispatch, id]);

  const handleSubmit = async ev => {
    ev.preventDefault();
    const result = await dispatch(addComent({ spotId: id, coment_text: text, rate }));
    if (!result.error) {
      setText('');
      setRate(0);
    }
  };

  return (
    <>
      <div className='header-box'>
        <Link to='/spots/new' className='new-page-button'>
          <img className='new-button-icon' alt='new-button' src={PlusIcon} />
        </Link>
        <Link to='/home' className='sub-logo'>
          <div className='sub-logo-smoking'>SMOKING</div>
          <div className='sub-logo-spot'>SPOT</div>
        </Link>
        <Link to='/spots' className='search-button'>
          <img className='search-button-icon' alt='map' src={SearchIcon} />
        </Link>
      </div>
      {error && !spot && <div className='error-text'>장소를 불러오지 못했습니다.</div>}
      {spot && (
        <div className='spot-detail'>
          <div className='image-N-creator'>
            <img className='spot-detail-image' src={spot.photo_url} alt={spot.title} />
            <div className='spot-detail-creator'>{spot.email}</div>
          </div>
          <div className='description-box'>
            <div className='spot-detail-title'>{spot.title}</div>
            <div className='spot-detail-rate'>
              <Stars value={average(coments)} />
            </div>
            <div className='spot-detail-address'>주소: {spot.address}</div>
          </div>
          <form className='user-input-box' onSubmit={handleSubmit}>
            <div className='right-input-box'>
              <input
                className='text-input'
                type='text'
                maxLength={500}
                value={text}
                placeholder='댓글을 남겨주세요..'
                onChange={ev => setText(ev.target.value)}
              />
              <Stars className='rate-input' value={rate} onChange={setRate} />
            </div>
            <input
              className={`user-submit ${!!text}`}
              type='submit'
              value='등록'
              disabled={!text.trim()}
            />
          </form>
          <div className='coment-list-box'>
            {coments.map(c => (
              <div className='coment-box' key={c._id}>
                <div className='create-by'>{c.created_by}</div>
                <div className='coment-text'>{c.coment_text}</div>
                <div className='created-at'>{String(c.created_at).slice(0, 10)}</div>
                <Stars className='coment' value={c.rate} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
