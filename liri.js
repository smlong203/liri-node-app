require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");

var fs = require("fs");
var request = require("request");
var moment = require("moment");

var command = process.argv[2];
var input = process.argv[3].join(" ");

var bands = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=2018-08-25%2C2018-09-01"
var omdb = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

switch (command) {
    case "concert":
        concertfunction();
        break;

    case "spotifynow":
        spotifynowfunction();
        break;

    case "movienow":
        movienowfuncin();
        break;
}

//COMMENT: Code source - the below is code written together, in class, with my neighbor Chris 
function concertfunction() {
    request(bands, function (err, response, data) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(data);
            var date = moment(data[0].datetime).format('MMMM Do YYYY');

            console.log("You searched for " + input + ", and the soonest event coming up is: " + "\n" +
                "Venue Name: " + (data[0].venue.name) + "\n" +
                "Venue Location: " + (data[0].venue.city) + "\n" +
                "Event Date: " + (date));
        };
    });
}

//COMMENT: Code source - the below is code written together, in class, with my neighbor Chris
function spotifynowfunction() {

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({
        type: 'track',
        query: input,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artistInfo = data.tracks.items;

        console.log("Artist Name: " + (artistInfo[0].artists[0].name) + " \n" +
            "Click Here For More: " + (JSON.stringify(artistInfo[0].external_urls)) + " \n" +
            "Album Name: " + (artistInfo[0].album.name));
    });
}

//Unfortunatley I am having trouble with the OMDB function & it is almost deadline to commit code to get Github. I will finish what I started & inquire further in class Thursday 8/30. 