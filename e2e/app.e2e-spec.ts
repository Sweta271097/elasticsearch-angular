import { ElasitcsearchAngularPage } from './app.po';

describe('elasitcsearch-angular App', () => {
  let page: ElasitcsearchAngularPage;

  beforeEach(() => {
    page = new ElasitcsearchAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
