const fs = require('node:fs');

function sorter(path, gender, newPath) {
    fs.readdir(path, (err, files) => {
        console.log(files);

        for (const fileName of files) {
            fs.stat(`${path}/${fileName}`, (err, stats) => {
                // console.log(stats);

                if (stats.isFile()) {
                    fs.readFile(`${path}/${fileName}`,
                        (err2, data) => {
                            console.log(data.toString());
                            const parsedData = JSON.parse(data);

                            if (parsedData.gender === gender) {
                                fs.rename(`${path}/${fileName}`, `${newPath}/${fileName}`, (err) => {
                                    console.log(err);
                                })
                            }
                        })
                }
            })
        }
    })
}

sorter('./Male', 'Female', './Female');
