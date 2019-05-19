import {AIRTABLE_API_KEY} from './secrets'
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keyhjIHag6pThZ0k3'}).base(AIRTABLE_API_KEY);


export function getShit(callback) {
    console.log("fuck off");
    let foobar = [];
    return base('Imported table').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1000,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.


        const filteredRecords = records.filter(x => x.fields.Dato && x.fields.Type);

        const mappedRecors = filteredRecords.map(x => ({dato: new Date(x.fields.Dato),  distanse: x.fields.Distanse, type: x.fields.Type.trim()}));
        foobar = [...foobar, ...mappedRecors];
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err);
        }
        callback(foobar)
    });
}