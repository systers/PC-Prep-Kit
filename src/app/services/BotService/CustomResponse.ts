interface CustomResponse {
  [intent: string]: any
}


export const CustomResponse: CustomResponse = {
  intro: {
    image: 'assets/img/intro.png',
    link: [{name: 'Highlight The Definition', href: 'introduction/activity-1'}, {name: 'An interactive Video', href: 'malaria-101/activity-1-1'}, {name: 'Life cycle of malarial Mosquito', href: 'malaria-101/activity-1-2'}],
  },
  prevent: {
    link: [{name: 'StopTheBreed', href: 'prevent/stop-the-breed/game'}, {name: 'StrideAgainstMalaria', href: 'prevent/stride-against-malaria/game'}],
    // image: 'assets/img/prevent.png'
  }
};

