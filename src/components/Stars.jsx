// 평점 표시(readonly) / 입력 겸용 별점
const Stars = ({ value = 0, onChange, className = '' }) => {
  const rounded = Math.round(value || 0);
  return (
    <span className={`stars ${className}`} aria-label={`평점 ${value || 0}`}>
      {[1, 2, 3, 4, 5].map(n =>
        onChange ? (
          <button type='button' key={n} onClick={() => onChange(n)} aria-label={`${n}점`}>
            {n <= rounded ? '★' : '☆'}
          </button>
        ) : (
          <span key={n}>{n <= rounded ? '★' : '☆'}</span>
        )
      )}
    </span>
  );
};

export default Stars;
