describe('factory: Search', function(){
  var search;
  var httpBackend;
  var items;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  beforeEach(inject(function(SearchHelpers){
      items = SearchHelpers.items;
    }))

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .when("https://api.github.com/search/users?access_token=7458b50664a5209ab61c80fc7b3b86c494f3226c&q=hello")
      .respond(
        { items: items }
      );
  }));

  it('responds to query', function(){
    expect(search.query).toBeDefined();
  });

  it('returns search results', function(){
    search.query('hello')
      .then(function(response) {
        expect(response.data).toEqual(items)
      })
  });
});