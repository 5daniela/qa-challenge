const axios = require('axios');
const {expect} = require('chai');
describe('GET https://qa-challenge-api.scratchpay.com', () => {
  let token
  const baseUrl = 'https://qa-challenge-api.scratchpay.com'

  before(async () => {
    token = (await axios.get(`${baseUrl}/api/auth`, {
      params: {
        email: 'gianna@hightable.test', password: 'thedantonio1'
      }
    })).data.data.session.token
  })

  context('GET /api/clinics/2/emails', () => {
    it('returns 400 status code', async () => {
      const response = await axios.get(`${baseUrl}/api/clinics/2/emails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, validateStatus: () => true
      })
      expect(response.status).to.eq(400)
    })
  })
  context('GET /api/clinics?term=veterinary', () => {
    it('returns 200 status code', async () => {
      const response = await axios.get(`${baseUrl}/api/clinics?term=veterinary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, validateStatus: () => true
      })
      expect(response.status).to.eq(200)
    })
    it('returns 401 status code when not authorized', async () => {
      const response = await axios.get(`${baseUrl}/api/clinics?term=veterinary`, {
        validateStatus: () => true
      })
      expect(response.status).to.eq(401)
    })
  })
})


