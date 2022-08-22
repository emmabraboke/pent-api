import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const host = 'http://localhost:5000';

describe('review test', () => {
  //retains cookie in each request
  const agent = chai.request.agent(host);
  it('should return status code of 200', async () => {
    const res = await agent.post('/user/signIn').send({
      email: 'ebraboke@gmail.com',
      password: '123567',
    });

    chai.expect(res.status).to.equal(200);
  }).timeout(20000);

  it('should return status code of 200', async () => {
    const res = await agent.get('/review');
    chai.expect(res.status).to.equal(200);
  }).timeout(20000);

  it('should return status code of 404', async () => {
    const res = await agent.get('/review/1dcjcicj');
    chai.expect(res.status).to.equal(404);
  }).timeout(20000);

  it('should return status code of 200', async () => {
    const res = await agent.get('/review/user');
    chai.expect(res.status).to.equal(200);
  }).timeout(20000);
});
