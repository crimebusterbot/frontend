import { SmarttrashcanPage } from './app.po';

describe('smarttrashcan App', () => {
  let page: SmarttrashcanPage;

  beforeEach(() => {
    page = new SmarttrashcanPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
