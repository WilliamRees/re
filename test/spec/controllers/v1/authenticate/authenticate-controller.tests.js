
describe('AuthenticateController Tests', function() {

  var authenticateController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    authenticateController = require('../../../../../re.webapi/app/controllers/v1/authenticate/authenticate-controller');
  });

  describe('post()', function() {

    it('should be a function', function(done) {
      expect(authenticateController.post).to.be.a('function');
      done();
    });

    // it('should call res.status() one time', function(done) {
    //   authenticateController.post(req, res, next);

    //   expect(res.status.callCount).to.equal(1);
    //   done();
    // });

    // it('should call res.status() with 200', function(done) {
    //     authenticateController.post(req, res, next);

    //   expect(res.status.calledWith(200)).to.equal(true);
    //   done();
    // });

  });
});
