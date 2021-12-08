import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Pruebas en peticiones', () => {
  it('GET api', () => {
    const app = 'http://localhost:3000'
    let respuesta = chai.request(app)
      .get('/personas')
      .end((err, response) => {
        console.log(response);
        expect(response).to.have.status(200);
        done();
      })
    console.log(respuesta);
  })
})