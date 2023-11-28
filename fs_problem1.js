
const fs = require("fs");

const problem1 = (absolutePath, randomFiles) => {
    const randomData = {
      name: "Rashid",
      age: 21,
    };
  
    const accessFolder = (absolutePath) => {
      return new Promise((resolve, reject) => {
        fs.access(absolutePath, (err) => {
          if (err) {
            fs.mkdir(absolutePath, (err) => {
              if (err) {
                reject(`Error in creating directory ${err}`);
              } else {
                resolve("Directory is created !");
              }
            });
          } else {
            resolve("Already Directory exists");
          }
        });
      });
    };
  
    const createRandomFileAndDelete = (absolutePath, randomFiles) => {
      return new Promise((resolve, reject) => {
        let promise = [];
  
        for (let i = 1; i <= randomFiles; i++) {
          promise.push(
            new Promise((resolve, reject) => {
              fs.writeFile(
                `${absolutePath}/file${i}.json`,
                JSON.stringify(randomData),
                (err) => {
                  if (err) {
                    reject(`Error in creating file${i}`);
                  } else {
                    resolve(`File${i} is created Successfully`);
                  }
                }
              );
            })
          );
  
          promise.push(
            new Promise((resolve, reject) => {
              fs.unlink(`${absolutePath}/file${i}.json`, (err) => {
                if (err) {
                  reject(`Error in deleting file${i}`);
                } else {
                  resolve(`File${i} is deleted Successfully`);
                }
              });
            })
          );
        }
  
        Promise.all(promise)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(`Error in Creating file ${err}`);
          });
      });
    };
  
    accessFolder(absolutePath)
      .then((result) => {
        console.log(result);
        return createRandomFileAndDelete(absolutePath, randomFiles);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  module.exports.problem1 = problem1;