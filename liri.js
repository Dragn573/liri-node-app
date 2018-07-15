require("dotenv").config();
console.log(dontev);
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = require('request');
var fs = require("fs");

var task = process.argv[2];
var thingSearched = process.argv[3];

if (task === "movie-this") {
    movieSearch();
} else if (task === "spotify-this-song"){
    spotifySearch();
}


function spotifySearch() {
    if (thingSearched == null) {
        thingSearched = 'The Sign';
    }
    spotify.search({
        type: 'track',
        query: thingSearched 
    }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
            }
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}

function movieSearch () {
    console.log(thingSearched);
    if (thingSearched === "Undefined"){
        var queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + thingSearched + "&y=&plot=short&apikey=trilogy";
    }

    var request = require("request");
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            console.log("-----------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-----------------------");
            
        }
    })
}