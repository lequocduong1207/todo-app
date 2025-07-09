const getHomepage = async (req, res) => {
    // return res.render('sample.ejs')
    res.send("hello world");
}

module.exports = {
    getHomepage,
}