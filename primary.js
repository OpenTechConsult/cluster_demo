const cluster = require('node:cluster');
const os = require('node:os');


const cpuCount = os.cpus().length;

console.log(`The total number of CPU is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);

cluster.setupPrimary({
    exec: __dirname + "/index.js",
});

for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} has been killed`);
    console.log("Starting another worker");
    cluster.fork();
});

