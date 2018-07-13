// fetchCurrentUser.js
import $ from "jquery";
function parseUserJson(userJson) {
  console.log(userJson);
  return {
    loggedIn: true,
    fullName: userJson.firstName + ' ' + userJson.lastName
  };
}
function fetchCurrentUser(callback) {
  return $.ajax({
    type: 'GET',
    url: './sample.json',
    success: function(userJson) {
      callback(parseUserJson(userJson));
      console.log("load");
    }
  });
}
module.exports = fetchCurrentUser;
