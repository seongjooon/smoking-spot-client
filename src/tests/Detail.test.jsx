import { average } from '../components/Detail';
import { render, screen } from '@testing-library/react';
import Stars from '../components/Stars';

describe('rating', () => {
  it('average is 0 for no comments (not NaN)', () => {
    expect(average([])).toBe(0);
    expect(average([{ rate: 5 }, { rate: 3 }])).toBe(4);
  });

  it('Stars renders filled and empty stars', () => {
    render(<Stars value={3} />);
    expect(screen.getByLabelText('평점 3').textContent).toBe('★★★☆☆');
  });
});
