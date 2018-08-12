interface PreviousActivityConfig {
  prevStage: number;
  prevActivity: number;
}

interface Routes {
  [componentName: string]: PreviousActivityConfig
}

export const ActivityRoutes: Routes = {
  HighlightActivityComponent: {
    prevStage: 0,
    prevActivity: 0
  },

  PcpolicyComponent: {
    prevStage: 1,
    prevActivity: 1
  },

  PicturePuzzleComponent: {
    prevStage: 1,
    prevActivity: 2
  },

  AnimatedVideoComponent: {
    prevStage: 1,
    prevActivity: 3
  },

  MalariaLifeCycleComponent: {
    prevStage: 1,
    prevActivity: 3
  },

  DragdropComponent: {
    prevStage: 2,
    prevActivity: 1
  },

  OddOneOutComponent: {
    prevStage: 2,
    prevActivity: 2
  },

  MatchmedsComponent: {
    prevStage: 2,
    prevActivity: 3
  },

  MemoryGameComponent: {
    prevStage: 3,
    prevActivity: 1
  },

  StopTheBreedComponent: {
    prevStage: 3,
    prevActivity: 2
  },

  StridesAgainstComponent: {
    prevStage: 4,
    prevActivity: 1
  },

  MoskitoAsesinatoComponent: {
    prevStage: 4,
    prevActivity: 2
  }
};

