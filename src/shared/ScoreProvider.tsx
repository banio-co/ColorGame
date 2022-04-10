import React, { useContext, useState } from 'react';

export enum ScoreAction {
  INCREMENT,
  DECREMENT
}

export type ScoreStore = Readonly<{
  score: number;
  updateScore(action: ScoreAction): void;
}>;

const ScoreContext = React.createContext<ScoreStore>(null);
export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ score, setScore ] = useState(0);

  const increment = () => {
    setScore(score + 1);
  };

  const decrement = () => {
    setScore(score - 1);
  };

  const updateScore = (action: ScoreAction) => {
    switch (action) {
      case ScoreAction.INCREMENT:
        return increment();
      case ScoreAction.DECREMENT:
        return decrement();
      default:
        return;
    }
  };

  return (
    <ScoreContext.Provider value={{ score, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = (): ScoreStore => useContext(ScoreContext);
