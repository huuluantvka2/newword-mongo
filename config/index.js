const account = require('./account.json');

module.exports = {
  getConnectDatabase: () => {
    return `mongodb+srv://huuluantvka2:${account.password}@cluster0.nwwpd.mongodb.net/NewWord?retryWrites=true&w=majority`;
  },
};
