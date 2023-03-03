const express = require("express");
const bodyParser = require("body-parser");
const req = require("request");

app = express();
app.use(express.static("public"));
app.use(express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mainSource = "/images/"

function winnerFunc(userchoice, randomNumber) {
    if (userchoice === randomNumber) {
        return ("DRAW");
    } else if (userchoice === "stone") {
        if (randomNumber === "paper") {
            return ("COMPUTER");
        } else {
            return ("PLAYER");
        }
    } else if (userchoice === "paper") {
        if (randomNumber === "stone") {
            return ("PLAYER")
        } else {
            return ("COMPUTER")
        }
    } else if (userchoice === "scissors") {
        if (randomNumber === "stone") {
            return ("COMPUTER");
        } else {
            return ("PLAYER");
        }
    }
}

const gameOptions = ["stone", "paper", "scissors"];
var randomNumber = Math.floor(Math.random() * 3);
randomNumber = gameOptions[randomNumber];;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/game", function(req, res) {
    var userchoice = Number(req.body.userchoice);
    userchoice -= 1
    userchoice = gameOptions[userchoice];

    var source1 = mainSource + userchoice + ".jpg";
    var source2 = mainSource + randomNumber + ".jpg";

    var win = winnerFunc(userchoice, randomNumber);
    res.render("game", { source1: source1, source2: source2, answer1: userchoice, answer2: randomNumber, winner: win });

});

app.listen("3000", function() {
    console.log("server running on port 3000");
});