const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

var trucks = []
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getTrucks() {
    try {
        const response = await axios.get('https://www.mascus.fr/+/brand%3dcaterpillar%26modelgroup%3d323%26categorypath%3dconstruction%252fexcavators%26year_range%3d0-2011%26location%3d150%26continent%3d150/+/1,20,relevance,search.html');
        const $ = cheerio.load(response.data);
        
        $('.result-info').each((index, elem) => {
            let truckInfo = {
                'name': $(elem).find('.result-title a').text(),
                'annee': $(elem).find('.result-details').text(),
                'isnewdate':$(elem).find('.latesticon').text()
            }
            trucks.push(truckInfo)
        })
        console.log(trucks)
        var json = JSON.stringify(trucks)
        fs.writeFile('myjsonfile.json', json, 'utf8');

    } catch (error) {
        console.error(error);
    }           
}

getTrucks()