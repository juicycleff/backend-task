var request = require("supertest");
var expect = require('chai').expect;
var path = require('path');
var chai = require('chai');

chai.use(require('chai-http'));
var server = require("../src/server")
var request = chai.request.agent(server);

describe('Exercise', function() {

    beforeEach(function() {
        delete require.cache[require.resolve('../src/server')];
    });

    after(function() {
        request.get('/').end(function () {
            request.close();
        });
    });

    // Test to make sure URLs respond correctly.
    it("url /", function(done) {
        request.get("/")
            .end(function(err, res) {
                expect(res.text).to.equal("Hello World!\n");
                done();
            });
    });


    it('file uploaded successfully', function(done) {
        request.post('/upload')
               .attach('file', path.join(__dirname, './data/download.jpeg'))
               .end(function(err, res) {
                    expect(res).to.have.status(200)
                    done()
               });
     });
});