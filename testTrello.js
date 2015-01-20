var x = require('./trello.js');

var y = new x();
y.createCard('KH MVP', 'Staging Bugs', 'TestCard', 'Hello World of cards', function(err, card) {
    console.log(card);
});
