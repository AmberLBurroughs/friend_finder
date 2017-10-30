var friendsData = require("../data/friendsData");
var sweetsData = require("../data/sweetsData");
console.log("test: ",friendsData);
module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
	app.get("/api/sweets", function(req, res) {
    res.json(sweetsData);
  });

  app.post("/api/quiz", function(req, res) {
    var index = Math.floor(Math.random() * 10); 
  	console.log("format: ",req.body);
    var newFriend = req.body;
    if(friendsData.length === 1){
      friendsData.push(newFriend);
      var result = [friendsData[0], sweetsData[index], newFriend]
      res.json(result);
    }else {
      console.log(friendsData);
      console.log(newFriend);
       
        var lowestDiff = 1000; // set this to a high number to start.
        var matchedFriend;
        var scoresLength = newFriend["scores[]"].length
        for(var fr=0;fr<friendsData.length;fr++){
          //console.log(": ",currentDiff);
          var currentFriend=friendsData[fr];
          var currentDiff = 0;
          
          for(var i = 0; i<scoresLength;i++){
            var scoreA = parseInt(newFriend["scores[]"][i]);
            var scoreB = currentFriend["scores[]"][i];
            var diff = Math.abs(scoreA-scoreB);
            currentDiff += diff;
          }

          if(currentDiff < lowestDiff || matchedFriend == undefined){
            lowestDiff = currentDiff;
            matchedFriend = currentFriend;
          }
        }
        friendsData.push(newFriend);
        var result = [matchedFriend, sweetsData[index], newFriend]
        res.json(result);
      }
  });
}