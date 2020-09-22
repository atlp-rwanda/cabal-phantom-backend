exports.getWelcome = (req, res) => {
    res.status(200).send({
        status:"Success",
        message:"Welcome to our phantom beginning"
    })
}

