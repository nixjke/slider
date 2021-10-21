import { Cat } from '../src/cat.module'
import { suite, test } from '@testdeck/mocha'
import * as _chai from 'chai'
import { expect } from 'chai'

_chai.should()
_chai.expect

@suite
class CatModuleTest {
  private SUT: Cat
  private name: string
  private color: string

  before() {
    this.name = 'Tom'
    this.color = 'black'
    this.SUT = new Cat(this.name, this.color)
  }

  @test 'Cat is created'() {
    this.SUT.name.should.to.not.be.undefined.and.have.property('name').equal('Tom')
  }

  @test 'Cat move 10m'() {
    let catMove = this.SUT.move(10)
    expect(catMove).to.be.equal('Tom moved 10m.')
  }

  @test 'Cat say meow'() {
    expect(this.SUT.say()).to.be.equal('Cat Tom says meow')
  }
}
