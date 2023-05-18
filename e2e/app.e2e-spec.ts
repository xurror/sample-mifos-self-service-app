import { MifosDashboardAngularPage } from "./app.po";

describe('mifos-dashboard-angular App', () => {
  let page: MifosDashboardAngularPage;

  beforeEach(() => {
    page = new MifosDashboardAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
