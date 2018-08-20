// __tests__/fetchCurrentUser-test.js
jest.dontMock('../src/js/fetchCurrentUser.js');
describe('fetchCurrentUser', function() {
  it('calls into $.ajax with the correct params', function() {
    window.$ = require('jquery');
    var fetchCurrentUser = require('../src/js/fetchCurrentUser');
    // Call into the function we want to test
    function dummyCallback() {
      console.log(dummyCallback);
    }
    fetchCurrentUser(dummyCallback);
    // Now make sure that $.ajax was properly called during the previous
    // 2 lines
    expect($.ajax).toBeCalledWith({
      type: 'GET',
      url: './sample.json',
      success: jasmine.any(Function)
    });
  });
});
