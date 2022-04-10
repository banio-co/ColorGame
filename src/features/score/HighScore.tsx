import React, { useEffect, useState } from 'react';

import ScoreDisplay from './ScoreDisplay';

const HighScore: React.FC = () => {
  const [ highScore, setHighScore ] = useState<number>(null);

  useEffect(() => {
    async function fetchHighScore() {
      try {
        // TODO: Fetch high score from __somewhere__
        const result = await new Promise<number>((resolve) => {
          // Mock response time and high score
          setTimeout(() => resolve(100), 100);
        });

        // If result is empty (no existing high score) set high score null
        setHighScore(result ?? null);
      } catch (err) {
        console.error('Fetch {High Score} failed!', err);
      }
    }

    fetchHighScore();
  });

  const highScoreDisplay = `${highScore ?? '- - -'}`;

  return (
    <ScoreDisplay label="High Score" score={highScoreDisplay} />
  );
};

export default HighScore;
