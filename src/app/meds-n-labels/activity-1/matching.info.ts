// Source: https://www.cdc.gov/malaria/travelers/drugs.html
export const MatchingInfo = {
    numElements: 5,
    medicines: ['mefloquine', 'malarone', 'doxycycline', 'chloroquine', 'primaquine'],

    level1:
    [ 'Causes upset stomach & problems with women prone to vaginal yeast infections',
      'People with severe renal impairment are known to have problems',
      'May exacerbate psoriasis',
      'May cause psychiatric and cardiac problems',
      'Causes problem with people having G6PD deficiency'
    ],

    level2:
    [ 'Daily medicine. Most effective for preventing P.vivax.',
      'works by interfering with the growth of parasites in the red blood cells.',
      'antibiotic that fights bacteria in the body.',
      'Can be used to treat mild/moderate cases but not for severe malaria.',
      'Weekly medicine. Consumption started 1-2 weeks prior travel.'
    ],
    ans: {
      level1: [4, 2, 1, 3, 5],
      level2: [5, 3, 1, 2, 4]
    }
};
