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
    var index = Math.floor(Math.random() * 10) + 1  
  	console.log("format: ",req.body);
    var currenFriend = req.body;
    if(friendsData.length === 1){
      friendsData.push(req.body);
      var result = [friendsData[0], sweetsData[index], currenFriend]
      res.json(result);
    }else {
      console.log(friendsData);
      /*
        [
        {
          name: 
          score[]:
        },
        {
  
        }

        ]
        current diff
        lowest difference 
        loop though array of objects compare scores current score against each object score
        
        difference var start 0 take the absolute from every inex and add to diff var.



      */


      // convert score to arr of ints 
      // look at all friends and compare to current friend score
      // which ever friend has the closest? number to current frind is a match
      // give them a candy  

    }
  });
}