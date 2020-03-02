const node_ssh = require("node-ssh");
const ssh = new node_ssh();

require("dotenv").config();

ssh
  .connect({
    host: process.env.SSH_host,
    username: process.env.SSH_user,
    privateKey: process.env.SSH_privatekey,
    passphrase: process.env.SSH_passphrase
  })
  .then(() => {
    ssh.execCommand("redis-cli ping", { cwd: "/var/www" }).then(result => {
      console.log("STDOUT: " + result.stdout);
      console.log("STDERR: " + result.stderr);
    });
  });
