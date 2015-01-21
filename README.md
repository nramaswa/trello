### Koneksa health Trello Wrapper API 


This repository contains initial commit of a generic card creation API in trello 

checkout the repository and include trello.js in your code 

In order for this API to work you need the following environment variables set 

export application_key=XXXXXXXXXXXXXXXXXX
export application_token=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY


Please see the trello API documentation on how to create these keys and tokens 

[Trello Developer key](https://trello.com/docs/index.html#generating-your-developer-key)


Example 

This example creates a card called "**TestCard**" with desc "**Hello World of cards**" in a board called "**KH-MVP**" under a list called "**Staging Bugs**"


On successful execution the card will be returned. 

	var x = require('./trello.js');

	var y = new x();
	y.createCard('KH MVP', 'Staging Bugs', 'TestCard', 'Hello World of cards', function(err, card) {
    console.log(card);
	});
	
	
	
