describe('GitUserSearchController', function(){
  beforeEach(module('GitUserSearch'));

  var ctrl;
  var httpBackend;
  var items;

  beforeEach(inject(function($controller){
    ctrl = $controller('GitUserSearchController');
  }));

  it('initialises with an empty search result and term', function(){
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {

    beforeEach(inject(function(SearchHelpers, _$httpBackend_){
      items = SearchHelpers.items;
      httpBackend = _$httpBackend_;
      httpBackend.whenGET("https://api.github.com/search/users?access_token=7458b50664a5209ab61c80fc7b3b86c494f3226c&q=hello")
        .respond([{
          items: items
        }]);
    }))

    afterEach(function(){
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });

  });
});