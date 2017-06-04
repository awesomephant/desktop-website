const csvFilePath = 'people.csv'
const outputFile = 'people.json'
const csv = require('csvtojson')
const fs = require('fs')
var json = {people: []};
csv()
    .fromFile(csvFilePath)
    .on('json', (data) => {
        // combine csv header row and csv line to a json object 
        // jsonObj.a ==> 1 or 4 
        json.people.push(data);
    })
    .on('done', (error) => {
        console.log(json)
        json = JSON.stringify(json, null, ' ')
        fs.writeFileSync(outputFile, json, 'utf-8')
    })