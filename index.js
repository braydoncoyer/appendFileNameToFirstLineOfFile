const fs = require('fs');

// const process = require('process');

const textFileDirectory = "/text files";

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


readLine.question('Please provide a path to the directory you would like to run', function(pathToFiles) {
    const pathFromScript = `${__dirname}${pathToFiles}`;
    fs.readdir(pathFromScript, (err, files) => {
      if (err) {
        console.error("Could not list the directory", err);
        process.exit(1);
      }

      files = files.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));


      files.forEach((file) => {
        // const filePath = `${__dirname}${textFileDirectory}/${file}`;
        console.log(file);
        const fileName = file.slice(0, file.indexOf("."));
        const data = fs.readFileSync(`${__dirname}${pathToFiles}/${file}`); //read existing contents into data
        const fd = fs.openSync(`${__dirname}${pathToFiles}/${file}`, "w+");

        const buffer = Buffer.from(`${fileName}\n`);

        fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
        fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
        fs.close(fd);
      });
    });
    readLine.close();
})