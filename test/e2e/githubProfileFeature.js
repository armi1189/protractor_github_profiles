describe('Github Profile finder', function() {
  
  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('has a title', function(){
    expect(browser.getTitle()).toEqual('Github user search');
  });

  it('finds profiles', function() {
    element(by.model('searchCtrl.searchTerm')).sendKeys('spike01');
    element(by.className('btn')).click();
    expect(element(by.binding('user.login')).getText()).toEqual('spike01');
  });


});