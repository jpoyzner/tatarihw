const fs = require('fs');
const readline = require('readline');

const rotations = {};
const spots = [];
readRotations();

function readRotations() {
  readline.createInterface({input: fs.createReadStream('rotations.csv')})
    .on('line', (line) => {
      if (!line.length) {
        return;
      }

      if (this.headersSkipped) {
        const values = line.split(',');
        const start = values[0].slice(1, -1);
        const end = values[1].slice(1, -1);
        const name = values[2].slice(1, -1);
        rotations[name] = {start, end};
      }

      this.headersSkipped = true;
    })
    .on('close', () => {
      this.headersSkipped = false;
      readSpots();
    });
}

function readSpots() {
  readline.createInterface({ input: fs.createReadStream('spots.csv') })
    .on('line', (line) => {
      if (!line.length) {
        return;
      }

      if (this.headersSkipped) {
        const values = line.split(',');
        const date = values[0].slice(1, - 1);
        const time = values[1].slice(1, - 1);
        const creative = values[2].slice(1, - 1);
        const spend = parseFloat(values[3]);
        const views = parseInt(values[4], 10);
        spots.push({ date, time, creative, spend, views });
      }

      this.headersSkipped = true;
    })
    .on('close', () => {
      saveFormattedData();
    });
}

function saveFormattedData() {
  const data = {
    totalSpots: spots.length,
    totalSpend: 0,
    totalViews: 0,
    creatives: {},
  };

  spots.forEach((spot) => {
    data.totalSpend += spot.spend;
    data.totalViews += spot.views;

    if (!data.creatives[spot.creative]) {
      data.creatives[spot.creative] = { totalSpend: 0, totalViews: 0, CPV: 0 };
    }

    const creative = data.creatives[spot.creative];
    creative.name = spot.creative;
    creative.totalSpend += spot.spend;
    creative.totalViews += spot.views;
    creative.CPV = spot.spend / spot.views;
  });

  fs.writeFile(
    "data.js",
    "export default JSON.parse('" + JSON.stringify(data) + "');",
    function(err) {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Formatted data was saved!");
    });
}
