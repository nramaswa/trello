var request = require('request');
var _ = require('underscore');

module.exports = function() {

    var escapeString = function(str) {

        console.log('type of str ' + typeof str);
        var replString = str.replace(/\\n/g, "\\n")
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/&/g, "\\&")
            .replace(/r/g, "\\r")
            .replace(/t/g, "\\t")
            .replace(/b/g, "\\b")
            .replace(/f/g, "\\f");
        console.log('replString: ' + replString);
        return replString;
    }
    var getObject = function(params, callback) {
        var payload = {
            url: 'https://api.trello.com/' + params.url,
            method: 'GET',
            json: {
                key: process.env.application_key,
                token: process.env.application_token
            }
        }
        var keys = Object.keys(params);

        for (var i = 0; i < keys.length; i++) {

            payload.json[keys[i]] = keys[i];
        }


        request(payload, function(error, response, body) {

            callback(error, body);

        })
    };

    var addObject = function(params, callback) {

        var payload = {
            url: 'https://api.trello.com/' + params.url,
            method: 'POST',
            json: {
                key: process.env.application_key,
                token: process.env.application_token
            }
        }

        var keys = Object.keys(params);

        for (var i = 0; i < keys.length; i++) {
            payload.json[keys[i]] = params[keys[i]];
        }

        request(payload, function(error, response, body) {

            callback(error, body);

        });
    }

    var valueForKey = function(object, keyName, keyValue, valueName) {

        var index = _.indexOf(_.pluck(object, keyName), keyValue);

        return (index === -1) ? null : object[index][valueName];
    }

    this.createCard = function(boardName, listName, cardName, description, callback) {

        var params = {
            url: '1/members/me/boards'
        }
        getObject(params, function(err, body) {
            if (err) {
                callback(err, body);

            } else {

                var boardId = valueForKey(body, 'name', boardName, 'id');


                var params = {
                    url: '1/boards/' + boardId + '/lists'
                }

                getObject(params, function(err, body) {

                    if (err)
                        callback(err, body);
                    else {
                        var listId = valueForKey(body, 'name', listName, 'id');
                        var params = {
                            url: '1/cards',
                            name: cardName,
                            desc: description,
                            labels: 'yellow',
                            idList: listId,
                            due: null,
                            urlSource: null
                        }
                        addObject(params, function(err, card) {
                            callback(err, card);
                        });
                    }
                });
            }
        });

    }
}
