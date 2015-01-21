var Trello = require('./trello.js');
var fs = require('fs');

var trello = new Trello();

if (process.argv.length < 6) {

    console.log('Usage node createCard.js trello-board-name trello-list-name trello-card-name desc-file');
    process.exit(1);
}

var desc = fs.readFileSync(process.argv[5]).toString();
console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(process.argv[4]);
console.log(process.argv[5]);
console.log('desc ' + desc);
trello.createCard(process.argv[2], process.argv[3], process.argv[4], desc, function(err, card) {
    console.log(card);
});
