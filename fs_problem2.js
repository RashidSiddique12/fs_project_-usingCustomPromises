const fs = require("fs");

const problem2 = () => {
  const readFile = (filePathLipsum) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePathLipsum, "utf-8", (err, data) => {
        if (err) {
          reject(`Error in reading ${filePathLipsum} file ${err}`);
        } else {
          resolve(data);
        }
      });
    });
  };

  const writeFile = (filePath, content) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          reject(`Error in writing in file${filePath} ${err}`);
        } else {
          resolve();
        }
      });
    });
  };

  const addFilename = (filePath, content) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(filePath, content + "\n", (err) => {
        if (err) {
          reject(`Error in writing ${content} file name`);
        } else {
          resolve(`${content} file name is added`);
        }
      });
    });
  };

  const deleteFile = (fileName) => {
    return new Promise((resolve, reject) => {
      let promiseArr = [];
      fileName.forEach((file) => {
        promiseArr.push(
          new Promise((resolve, reject) => {
            fs.unlink(file, (err) => {
              if (err) {
                reject(`unable to delete file ${file} ${err}`);
              } else {
                resolve(`${file} file is deleted`);
              }
            });
          })
        );
      });

      Promise.all(promiseArr)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const filePathLipsum = "../output/lipsum.txt";
  readFile(filePathLipsum)
    .then((result) => {
      // console.log(result);
      console.log(`lipsum file read successfully`);
      const content = result.toUpperCase();
      return writeFile("../output/upperCaseContent.txt", content);
    })
    .then(() => {
      console.log("data is written in uppercase file");
      return writeFile(
        "../output/filesname.txt",
        "../output/upperCaseContent.txt\n"
      );
    })
    .then(() => {
      console.log("upperCaseFileContent is added");
      return readFile("../output/upperCaseContent.txt");
    })
    .then((result) => {
      console.log("upperCase data is read successful");
      const lowerCaseContent = result.toLowerCase().split(".").join("\n");
      return writeFile("../output/lowerCaseContent.txt", lowerCaseContent);
    })
    .then(() => {
      console.log("data is written in lowercase file");
      return addFilename(
        "../output/filesname.txt",
        "../output/lowerCaseContent.txt"
      );
    })
    .then((result) => {
      console.log(result);
      return readFile("../output/lowerCaseContent.txt");
    })
    .then((result) => {
      console.log("lowerCase data is read successful");
      const sortedContent = result.split(" ").sort().join(" ");
      return writeFile("../output/sortedContent.txt", sortedContent);
    })
    .then(() => {
      console.log("data is written in sorted content file");
      return addFilename(
        "../output/filesname.txt",
        "../output/sortedContent.txt"
      );
    })
    .then((result) => {
      console.log(result);
      return readFile("../output/filesname.txt");
    })
    .then((result) => {
      console.log("Filesname is read successfull");
      const fileName = result.split("\n").filter(Boolean);
      return deleteFile(fileName);
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.problem2 = problem2;
