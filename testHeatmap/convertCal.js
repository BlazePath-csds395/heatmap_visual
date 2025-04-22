const fs = require('fs');
const csv = require('csvtojson');

const inputFile = 'California_train_data.csv';   // Your California input
const outputFile = 'California_heatmap_data.js'; // ✅ New output for California

csv()
    .fromFile(inputFile)
    .then((jsonArray) => {
        console.log(`✅ Loaded ${jsonArray.length} rows from ${inputFile}`);
        
        const filteredData = jsonArray.map(row => ({
            latitude: parseFloat(row.latitude_weather),
            longitude: parseFloat(row.longitude_weather),
            severity: parseInt(row.target)
        }));

        const jsContent = `const data = ${JSON.stringify(filteredData, null, 4)};\n\nexport default data;`;

        fs.writeFileSync(outputFile, jsContent, 'utf8');

        console.log(`✅ Conversion complete! Data saved to ${outputFile}`);
    })
    .catch((err) => console.error("❌ Error converting CSV:", err));
