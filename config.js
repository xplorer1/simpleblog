module.exports = {
    'port': process.env.PORT || 8080,
    //'BASE_URL': "https://corporatetransit.ng",
    'BASE_URL': "http://localhost:8050",
    //'database': 'mongodb://corporateuser:Delta!!2016!@ds157383.mlab.com:57383/corporatetransit',
    'database': 'mongodb://localhost:27017/simpleblog',
    'secret': 'Delta!!2016!sar6fa2a37f65dd8d79d8d77dfidf0ddifaf3f2f1f4f5sdjskjgh97sughshs',
    'hash' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVnd3VhbnlpMDQyQGdtYWlsLmNvbSIsImlhdCI6MTU1NjM2Mzk0OCwiZXhwIjoxNTU2MzY0MzA4fQ.hlvsog5NVcZphKxpJPPBBoMww9XRNZ-_h51osqyBqPg/',
    generatePassword: function () {
        var length = 8,
            charset = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
}