import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Detail.scss';

import Rating from 'react-rating';
import jwt from 'jsonwebtoken';

let userToken = localStorage.getItem('jwtToken');
let decodedToken;
if (userToken) {
  decodedToken = jwt.verify(userToken, process.env.REACT_APP_SECRET_KEY);
}

const Detail = ({
  match: { params },
  getSpotDetail,
  spotDetail,
  onSubmit,
  getComents,
  comentList
}) => {
  const [rate, setRate] = useState(0);
  const [comentText, setComentText] = useState('');

  useEffect(() => {
    getSpotDetail(params.id);
    getComents(params.id);
    return () => {};
  }, []);

  const _handleSubmit = ev => {
    ev.preventDefault();
    onSubmit({
      spot_id: params.id,
      created_by: decodedToken.email,
      created_at: new Date(),
      coment_text: comentText,
      rate
    });
  };

  return (
    <>
      <div className='header-box'>
        <Link to='/spots/new' className='new-page-button'>
          <img
            className='new-button-icon'
            alt='new-button'
            src='https://www.iconsdb.com/icons/preview/white/plus-5-xxl.png'
          />
        </Link>
        <Link to='/home' className='sub-logo'>
          <div className='sub-logo-smoking'>SMOKING</div>
          <div className='sub-logo-spot'>SPOT</div>
        </Link>
        <Link to='/spots/map' className='search-button'>
          <img
            className='search-button-icon'
            alt='search box'
            src='https://www.iconsdb.com/icons/preview/white/search-12-xxl.png'
          />
        </Link>
      </div>
      {spotDetail && (
        <div className='spot-detail'>
          <div className='image-N-creator'>
            <img
              className='spot-detail-image'
              src={spotDetail.photo_url}
              alt={spotDetail.title}
            />
            <div className='spot-detail-creator'>{spotDetail.email}</div>
          </div>
          <div className='description-box'>
            <div className='spot-detail-title'>{spotDetail.title}</div>
            <div className='spot-detail-rate'>
              <Rating
                className='rate-box'
                initialRating={
                  comentList.reduce((acc, coment) => acc + coment.rate, 0) /
                  comentList.length
                }
                readonly
                emptySymbol={
                  <img
                    src='https://cdn3.iconfinder.com/data/icons/essentials-volume-i/128/star-3-512.png'
                    className='icon'
                    alt='icon'
                  />
                }
                fullSymbol={
                  <img
                    src='https://cdn1.iconfinder.com/data/icons/vote-reward-7/24/award_reward_rate_rating_star_empty-512.png'
                    className='icon'
                    alt='icon'
                  />
                }
              />
            </div>
            <div className='spot-detail-address'>
              주소: {spotDetail.address}
            </div>
          </div>
          <form className='user-input-box' onSubmit={_handleSubmit}>
            <div className='right-input-box'>
              <input
                className='text-input'
                type='text'
                placeholder='댓글을 남겨주세요..'
                onChange={ev => setComentText(ev.target.value)}
              />
              <Rating
                className='rate-box rate-input'
                onClick={clickedRate => setRate(clickedRate)}
                emptySymbol={
                  <img
                    src='https://cdn3.iconfinder.com/data/icons/essentials-volume-i/128/star-3-512.png'
                    className='icon'
                    alt='icon'
                  />
                }
                fullSymbol={
                  <img
                    src='https://cdn1.iconfinder.com/data/icons/vote-reward-7/24/award_reward_rate_rating_star_empty-512.png'
                    className='icon'
                    alt='icon'
                  />
                }
              />
            </div>
            <input
              className={`user-submit ${!!comentText}`}
              type='submit'
              value='등록'
              disabled={!comentText}
            />
          </form>
          {comentList && (
            <div className='coment-list-box'>
              {comentList.map((coment, index) => (
                <div className='coment-box' key={index}>
                  <div className='create-by'>{coment.created_by}</div>
                  <div className='coment-text'>{coment.coment_text}</div>
                  <div className='created-at'>
                    {coment.created_at.slice(0, 10)}
                  </div>
                  <Rating
                    className='rate-box coment'
                    initialRating={coment.rate}
                    readonly
                    emptySymbol={
                      <img
                        src='https://cdn3.iconfinder.com/data/icons/essentials-volume-i/128/star-3-512.png'
                        className='icon'
                        alt='icon'
                      />
                    }
                    fullSymbol={
                      <img
                        src='https://cdn1.iconfinder.com/data/icons/vote-reward-7/24/award_reward_rate_rating_star_empty-512.png'
                        className='icon'
                        alt='icon'
                      />
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Detail;
