var mtgAllSets = require('./AllSets.json');
var http = require('http');
var request = require('request');
var fs = require('fs');
var RateLimiter = require('limiter').RateLimiter;
var sleep = require('sleep');
// console.log(Object.keys(mtgAllSets));

const {Builder, By, Key, until} = require('selenium-webdriver');
let driver = await new Builder().forBrowser('chrome').build();

var imgDownloader = require('image-downloader');

var setKeys = Object.keys(mtgAllSets);

var cardIndex = {};
var gathererIndex = {};

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
                cardIndex[c.multiverseId] = c;
                gathererIndex[c.multiverseId] = {
                    setId: mySetId,
                    cardNumber: c.number
                };
            }
        }
    });
});

console.log('total number of cards: ' + Object.keys(cardIndex).length);

var url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=54&type=card';
var filename = './gatherer/54.jpg';
var headers = {
    'Host': 'gatherer.wizards.com',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'en-US,en;q=0.9'
};


request.get(url, {headers: headers}).pipe(fs.createWriteStream(filename));

driver.

function DoScreencap(url, filename, driver) {
    driver.get(url);
    var orig_h = driver.executeScript("return window.outerHeight")
    var orig_w = driver.executeScript("return window.outerWidth")
    var margin_h = orig_h - driver.executeScript("return window.innerHeight")
    var margin_w = orig_w - driver.executeScript("return window.innerWidth")
    var new_h = driver.executeScript('return document.getElementsByTagName("img")[0].height')
    var new_w = driver.executeScript('return document.getElementsByTagName("img")[0].width')
}

// http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=74358&type=card
/*

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}

var url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=74358&type=card';
var filename = './gatherer/74358.jpg';

request(url).pipe(fs.createWriteStream(filename));


if (fs.existsSync(filename)) {
    console.log('confirmed file exists: ' + filename);
}

async function waitTest() {
    for (var i=0; i < 20; i++) {
        console.log(i);
        await sleep(1000);
    }
}

waitTest();
*/

var ids = Object.keys(cardIndex);

async function getMtgImage(id) {
    var mtgFileName = './gatherer/' + id + '.jpg';
    var keys = gathererIndex[id];
    var mtgUrl = 'https://img.scryfall.com/cards/normal/en/' + keys.setId.toLowerCase() + '/' + keys.cardNumber + '.jpg?1517813031';
    if (!fs.existsSync(mtgFileName)) {
        console.log(mtgUrl);
        // request.get(url, {headers: headers}).pipe(fs.createWriteStream(mtgFileName));
        imgDownloader.image({
            url: mtgUrl,
            mtgFileName
        })
        .then(({ xfilename, ximage }) => {
            console.log('File saved to', xfilename)
          })
          .catch((err) => {
            console.error(err)
          });
        
        // console.log('downloaded file: ' + mtgFileName);
        sleep.msleep(1000);
    } else {
        console.log('image already downloaded: ' + id);
    }
}

for (var i=0; i < ids.length; i++) { 
    getMtgImage(ids[i]);
}


