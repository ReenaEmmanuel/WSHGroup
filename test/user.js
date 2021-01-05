let server = require("../backend/routes/user-route");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

//Sign Up Testing
describe("/POST new user", () => {
  it("it should POST a new user", (done) => {
    let user = {
      FirstName: "Chris",
      LastName: "Parker",
      Age: 30,
      Email: "Chirs.Parker@mail.com",
      UsrPwd: "123",
      UsrRole: 2
    };
    chai
      .request(server)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        //res.body.errors.should.have.property("pages");
        //res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
});


describe("/POST Login user", () => {
  it("it should login successfully", (done) => {
    let user = {
      Email: "Chirs.Parker@mail.com",
      UsrPwd: "123"
    };
    chai
      .request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        //res.body.errors.should.have.property("pages");
        //res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
});

