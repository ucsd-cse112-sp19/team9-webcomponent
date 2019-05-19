const showroom = require('showroom/puppeteer')()
const assert = require('assert')

describe('chatBox creation',() => {
   before( async () => {
       await showroom.start()
   })

   after( async () => {
       await showroom.stop()
   })

   beforeEach( async () => {
       await showroom.setTestSubject('chatBox')
   })

   it('Should update the name', async () => {
       await showroom.setAttribute('name','Matrix is not a name')
       const innerRoot = await showroom.find('// chat-box')
       const name = await showroom.getTextContent(innerRoot)
       assert.equal(text,'Matrix is not a name')
   })
})