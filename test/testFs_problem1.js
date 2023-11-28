// Problem 1:

// Using Custom promises and fs module's asynchronous functions, do the following:
//     1. Create a directory of random JSON files
//     2. Delete those files simultaneously

const { problem1 } = require("../fs_problem1");
const absolutePath = "./myFloder";
const randomFiles = Math.round(Math.random() * 10) + 1;

problem1(absolutePath, randomFiles);
