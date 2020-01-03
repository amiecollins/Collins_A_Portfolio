var deploy = require("ftp-deploy");
var deploy = new deploy();

var config = {
    user: "node.amiecollins.ca",
    password: "imjustanode",
    host: "ftp.amiecollins.ca",
    port: 21,
    localRoot: "C:/Users/goldy/Documents/Collins_A_Portfolio",
    remoteRoot: "/public/",
    include: ["*", "**/*"],
    exclude: ["node_modules/**", "node_modules/**/.*", ".git*", "/sass/**"],
    deleteRemote: false,
    forcePasv: true
};

deploy
    .deploy(config)
    .then(res => console.log("result is-", res))
    .catch(err => console.log(err));

deploy.deploy(config, function(err, res) {
    if (err) console.log(err);
    else console.log("no error-", res);
});