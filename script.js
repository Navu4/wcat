#!/usr/bin/env node

const fs = require('fs');      // Same as import command in java or python
// fs.writeFileSync("abc.txt", "My name is Navjot Singh", "utf-8"); // Write in the open file
// let data = fs.readFileSync("abc.txt", "utf-8");      // Read the open file
// console.log(fs.existsSync("abc.txt")); // Check if the file exits 


let arguments = process.argv.slice(2); // slice function same as in python 
console.log(arguments);

function wcat(arguments) {
  // Different Option for Entered Command
  let option = arguments.filter(function (data, index) {
    return data.startsWith('-'); // startWith =>  checks if string start with "-" return true or false
  });

  // Different Files names
  let files = arguments.filter(function (data, index) {
    return data.endsWith('.txt');
  });

  // Content
  let content = arguments.filter(function (data, index) {
    return !data.startsWith('-') && !data.endsWith('.txt');
  });

  // Check if file name is entered or not
  if (files.length == 0) {
    console.log('Please specify a file name.');
    return;
  }

  // Check if the file with the entered name exists or not
  for (let i = 0; i < files.length; i++) {
    if (!fs.existsSync(files[i])) {
      console.log(files[i] + ' doesnot exits');
      return;
    }
  }

  // Display files
  let numbering = 1;
  for (let i = 0; i < files.length; i++) {
    let data = fs.readFileSync(files[i], 'utf-8'); // Read the files

    // Checks if the option includes -s  => remove the empty lines
    if (option.includes('-s')) {
      let lines = data.split('\r\n');

      if (option.includes('-w') && files.length == 2) {
        let datalist = lines[0];
        for (let c = 1; c < lines.length; c++) {
          if (lines[c] != '') {
            datalist = datalist + '\r\n' + lines[c];
          }
        }

        fs.writeFileSync(files[1], datalist);
        return;
      }

      for (let j = 0; j < lines.length; j++) {
        if (lines[j] != '' || lines[j] != '') {
          if (option.includes('-n') || option.includes('-b')) {
            // Checks if the option includes -n  => numbering the lines
            console.log(numbering, lines[j]);
            numbering += 1;
          } else {
            console.log(lines[j]);
          }
        }
      }
    } else if (
      (option.includes('-n') && !option.includes('-b')) ||
      (option.includes('-n') &&
        option.includes('-b') &&
        option.indexOf('-n') < option.indexOf('-b'))
    ) {
      // -n number all the lines present in the files
      // -n -b  => Numbering all the lines including empty lines
      // -b -n  => Numbering only the content line
      let lines = data.split('\r\n'); // split string in an array where \n is present

      for (let j = 0; j < lines.length; j++) {
        console.log(numbering, lines[j]);
        numbering += 1;
      }
    } else if (option.includes('-b')) {
      // -b number the lines except the empty lines

      let lines = data.split('\r\n'); // split string in an array where \n is present

      if (lines[0].includes('\n')) {
        lines = lines[0].split('\n');
      }

      for (let j = 0; j < lines.length; j++) {
        if (lines[j] != '') {
          console.log(numbering, lines[j]);
          numbering += 1;
        } else {
          console.log(lines[j]);
        }
      }
    } else if (option.includes('-w')) {
      //write file into another file or content in the entered file
      if (files.length != 2 || arguments.indexOf('-w') != 1) {
        if (content.length != 0) {
          let datalist = content[0];
          for (let c = 1; c < content.length; c++) {
            datalist = datalist + '\r\n' + content[c];
          }

          fs.writeFileSync(files[0], datalist);

          return;
        }
        console.log('Unable to run this command');
        return;
      } else {
        let data = fs.readFileSync(files[0], 'utf-8');
        fs.writeFileSync(files[1], data);
        return;
      }
    } else if (option.includes('-a')) {
      if (files.length != 2 || arguments.indexOf('-a') != 1) {
        console.log('Unable to run this command');
        return;
      } else {
        let data1 = fs.readFileSync(files[0], 'utf-8');
        let data2 = fs.readFileSync(files[1], 'utf-8');

        fs.writeFileSync(files[1], data2 + data1);
        return;
      }
    } else {
      console.log(data);
    }
  }
}

wcat(arguments);
