const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const devs = await Dev.find()

    return response.json(devs)
  },
  async store(request, response) {
    // eslint-disable-next-line camelcase
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const gitResponse = await axios.get(
        // eslint-disable-next-line camelcase
        `https://api.github.com/users/${github_username}`,
      )

      // eslint-disable-next-line camelcase, no-undef
      const { name, avatar_url, bio } = gitResponse.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }

    return response.json({
      dev,
    })
  },
}
