var path = require("path");
//load data from friends.js
var friends = require("../data/friend.js");

//routes
module.exports = function(app) {
  //API GET requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //API POST requests
  app.post("/api/friends", function(req, res) {

    //object to hold the best friend match
    var friendMatch = {
      name:"",
      photo:"",
      matchDifference: 1000
    };
    
    //results of user survey
    var userData = req.body;
    var userName = userData.name;
    var userImage = userData.photo;
    var userScores = userData.scores;

    //calculating the difference between the scores
    var totalDifference = 0;

    //loop through all the friend possibilities in the database
    for (var i =0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      //loop through all the scores of friend possibilities
      for (var j = 0; j < friends[i].scores[j]; j++) {
        //calculating the difference between the score and sum them into totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        //if the differences is less then the differences of the current "friend match"
        if (totalDifference <= friendMatch.matchDifference) {
          //reset the "friend match" to the new friend
          friendMatch.name = friends[i].name;
          friendMatch.photo = friends[i].photo;
          friendMatch.matchDifference = totalDifference;
        }
      }
    }
    //save user's data to the database
    friends.push(userData);

    //return a JSON with the user's "friend match"
    res.json(friendMatch);
  });
};
