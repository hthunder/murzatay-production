const Rubric = require("../models/rubric.model")

const slugToId = async (slug) => {
    const rubric = await Rubric.findOne({ slug }).lean()
    return rubric._id
}

const getRubricBySlug = async (slug) => {
    const rubric = await Rubric.findOne({ slug }).lean()
    return rubric
}

module.exports = {
    slugToId,
    getRubricBySlug,
}
