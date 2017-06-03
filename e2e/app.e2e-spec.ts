import { PcprepkitPage } from './app.po';

describe('pcprepkit App', () => {
  let page: PcprepkitPage;

  beforeEach(() => {
    page = new PcprepkitPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
