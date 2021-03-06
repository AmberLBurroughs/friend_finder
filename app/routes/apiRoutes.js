var friendsData = require("../data/friendsData");
var sweetsData = require("../data/sweetsData");
//console.log("test: ",friendsData);

module.exports = function(app) {

	app.get("/api/friends", function(req, response) {
    response.json(friendsData);
  });

	app.get("/api/sweets", function(req, res) {
    res.json(sweetsData);
  });

  app.post("/api/quiz", function(req, res) {
    var index = Math.floor(Math.random() * 10); 
  	//console.log("format: ",req.body);

    var newFriend = req.body;
    if(friendsData.length === 1){
      friendsData.push(newFriend);
      var match = [friendsData[0], sweetsData[index], newFriend]
      console.log("match", match)
      res.json(match);
    }else {
      //console.log(friendsData);
      //console.log(newFriend);

        var lowestDiff = 1000; // set this to any really high number to start.

        var matchedFriend; // undefined becasue initially the friend has not been matched with anyone.

        // total number on answered question from quiz for new friend
        var scoresLength = newFriend["score[]"].length
        //console.log(scoresLength);

        for(var j=0;j<friendsData.length;j++){
          //console.log(": ",currentDiff);
          var currentFriend = friendsData[j];
          var currentDiff = 0;
          
          for(var i = 0; i<scoresLength;i++){
            var scoreA = parseInt(newFriend["score[]"][i]); //1
            //console.log("scoreA", scoreA)
            var scoreB = parseInt(currentFriend["score[]"][i]); //1 
            //console.log("scoreB", scoreB)
            var diff = Math.abs(scoreA-scoreB);
            currentDiff += diff;
          }

          if(currentDiff < lowestDiff || matchedFriend == undefined){
            lowestDiff = currentDiff; 
            matchedFriend = currentFriend;
          }
        }
        friendsData.push(newFriend);
        var match = [
              matchedFriend,
              sweetsData[index],
              newFriend
            ]
        //console.log("match2", match)
        res.json(match);
      }
  });
}