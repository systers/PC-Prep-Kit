interface Points {
  [level: string]: number
}

interface ActivityPoints {
  [activityName: string]: Points
}

export const ActivityPoints: ActivityPoints = {
  highlightDefinition: {
    level1: 100,
  },
  pcPolicy: {
    level1: 50
  },
  picturePuzzle: {
    level1: 100,
    level2: 150,
    level3: 300
  },
  animatedVideo: {
    level1: 50
  },
  lifeCycle: {
    level1: 100
  },
  // dragAndDrop: { calculated dynamically },
  // oddOneOut: { calculated dynamically },
  matchMeds: {
    level1: 100,
    level2: 200
  },
  memoryGame: {
    level1: 100,
    level2: 200,
    level3: 300
  },
  stopBreed: {
    level1: 100,
    level2: 200
  },
  strideAgainst: {
    level1: 150,
    level2: 300
  },
  moskitoAsasinato: {
    level1: 150,
    level2: 200,
    level3: 300
  }
};
