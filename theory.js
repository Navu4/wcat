const fs = require("fs"); 

let data = fs.readFileSync("abc.txt", "utf-8");
let count = 0;

// console.log(data);
// for(let i = 0; i < data.length; i++){
//     // console.log(data[i]);
//     if(data[i] == 'n'){
//         count++;
//     }
// }
// console.log(count);

// OR

// let lines = data.split("\r\n");
// for(let i = 0; i < lines.length; i++){
//     for(let j = 0; j < lines[i].length; j++){
//         if(lines[i][j] == 'n'){
//             count++;
//         }
//     }
// }
// console.log(count);



#!/usr/bin/env node
const fs = require("fs");     // Same as import command in java or python
// fs.writeFileSync("abc.txt", "My name is Navjot Singh", "utf-8"); // Write in the open file
// let data = fs.readFileSync("abc.txt", "utf-8");      // Read the open file
// console.log(fs.existsSync("abc.txt")); // Check if the file exits 

let arguments = process.argv.slice(2);  // slice function same as in python 
console.log(arguments);

function wcat(arguments){

    // Different Option for entered command 
    let option = arguments.filter(function(data, index){
        return data.startsWith("-");   // startWith =>  checks if string start with "-" return true or false 
    });

    // Different Files names 
    let files = arguments.filter(function(data, index){
        return !data.startsWith("-");
    });

    // check if file name is entered of not
    if(files.length == 0){
        console.log("Please specify a file name.")
        return;
    }

    // Display Files
    let numbering = 1;
    for(let i = 0; i < files.length; i++){
        
        if(!fs.existsSync(files[i])){  // Check if the file with the entered name exists or not 
            
            console.log(files[i] + " doesnot exists");
            
        } else {
            
            let data = fs.readFileSync(files[i], "utf-8");  // Read the files 
            
            if(option.includes("-s")){      // Checks if the option includes -s
                
                let lines = data.split("\r\n");  // split string in an array where \n is present 
                

                if(option.includes("-w") || files.length != 2){
                    let datalist = lines[0];
                    for(let j = 1; j < lines.length; j++){
                        if(lines[j] != ""){
                            
                            datalist = datalist + "\r\n" + lines[j];
                            
                        }

                    }
                    fs.writeFileSync(files[1], datalist);
                    return;
                }

                if(lines[0].includes("\n")){
                    lines = lines[0].split("\n");
                }
                
                for(let j = 0; j < lines.length; j++){
                    
                    if(lines[j] != "" || lines[j] != ''){
                        if(option.includes("-n") ){
                          
                            console.log(numbering, lines[j]);
                            numbering += 1;

                        }   
                        else {
                            console.log(lines[j]);
                        }
                    }
                }

            }   else if((option.includes("-n") && !option.includes("-b")) || (option.includes("-n") && option.includes("-b")) && (option.indexOf("-n") < option.indexOf("-b"))) {   // -n number all the lines present in the files 
                // -n -b  => Numbering all the lines including empty lines
                // -b -n  => Numbering only the content line
                let lines = data.split("\r\n");  // split string in an array where \n is present 

                if(lines[0].includes("\n")){
                    lines = lines[0].split("\n");
                }

                for(let j = 0; j < lines.length; j++){
                    console.log(numbering, lines[j]);
                    numbering += 1;
                }

            }   else if(option.includes("-b")){  // -b number the lines except the empty lines
                
                let lines = data.split("\r\n");  // split string in an array where \n is present 

                if(lines[0].includes("\n")){
                    lines = lines[0].split("\n");
                }

                for(let j = 0; j < lines.length; j++){
                    
                    if(lines[j] != ""){
                    
                        console.log(numbering, lines[j]);
                        numbering += 1;
                    
                    }   else {
                        console.log(lines[j]);
                    }
                
                }

            }   else if(option.includes("-w")){
                
                if(files.length != 2 || arguments.indexOf("-w") != 1){
                   
                    console.log("Unable to run this command");
                    return;

                }    else {
                    
                    let data = fs.readFileSync(files[0], "utf-8");
                    fs.writeFileSync(files[1], data);
                    return;

                }
            }   else if(option.includes("-a")){
                
                if(files.length != 2 || arguments.indexOf("-a") != 1){
                   
                    console.log("Unable to run this command");
                    return;

                }    else {
                    
                    let data1 = fs.readFileSync(files[0], "utf-8");
                    let data2 = fs.readFileSync(files[1], "utf-8");
                    
                    fs.writeFileSync(files[1], data2 + data1);
                    return;
                }
            }
                else {
                console.log(data);
            }
        }
    }
}

wcat(arguments);