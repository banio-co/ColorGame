import React from 'react';

import { useScore } from '../../shared/ScoreProvider';
import ScoreDisplay from './ScoreDisplay';

const Score: React.FC = () => {
  const { score } = useScore();

  return (
    <ScoreDisplay label="Score" score={score}/>
  );
};

export default Score;
