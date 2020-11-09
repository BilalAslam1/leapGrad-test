const { app } = require('./app.js');
const port = process.env.PORT;

app.listen(port, () => { console.log(`listening on port ${port}`) })

module.exports = app;