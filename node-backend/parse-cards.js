var mtgAllSets = require('../../file-resources/AllSets.json');
var http = require('http');

var fs = require('fs');

var setKeys = Object.keys(mtgAllSets);

var cardIndex = {};




setKeys.forEach(el => {
    var mySetId = el;
    var cards = mtgAllSets[el].cards;
    // console.log(cards.length);
    cards.forEach(c => {
        // console.log(c.multiverseId);
        if (c.multiverseId) {
            if (cardIndex[c.multiverseId]) {
                console.log('Already in index. multiverseId: ' + c.multiverseId);
            } else {
                cardIndex[c.multiverseId] = {
                    setId: el,
                    artist: c.artist,
                    borderColor: c.borderColor,
                    colorIdentity: c.colorIdentity,
                    colorIndicator: c.colorIndicator,
                    colors: c.colors,
                    convertedManaCost: c.convertedManaCost,
                    flavorText: c.flavorText,
                    isOnlineOnly: c.isOnlineOnly,
                    legalities: c.legalities,
                    manaCost: c.manaCost,
                    multiverseId: c.multiverseId,
                    name: c.name,
                    names: c.names,
                    number: c.number,
                    printings: c.printings,
                    power: c.power,
                    rarity: c.rarity,
                    subtypes: c.subtypes,
                    supertypes: c.supertypes,
                    text: c.text,
                    toughness: c.toughness,
                    type: c.type,
                    types: c.types
                };                
            }
        }
    });
});

var cardIndexJson = JSON.stringify(cardIndex);
fs.writeFileSync('./data_gen/my-card-index.json', cardIndexJson);