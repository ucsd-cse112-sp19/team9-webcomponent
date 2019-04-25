const UserDecorator = require('../../src/decorators/user-decorator')

describe('UserDecorator', function () {
  beforeEach(function () {
    this.user = {
      firstName: 'john',
      lastName: 'doe',
      dateOfBirth: new Date('1984-03-02T16:00:00Z'),
    }
  })
  describe('#name', function () {
    it('returns full name', function () {
      expect(new UserDecorator(this.user).name()).to.equal(
        `${this.user.firstName} ${this.user.lastName}`)
    })
  })

  describe('#dateOfBirth', function () {
    it('returns formatted date', function () {
      expect(new UserDecorator(this.user).dateOfBirth()).to.equal('1984-03-02')
    })
  })
})