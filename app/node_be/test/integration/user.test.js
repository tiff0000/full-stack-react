const request = require('supertest');
const {User} = require('../../models/user');
let server;
const port = process.env.PORT || 5555;

describe('/api/users', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach( async () => {
    server.close();
    await User.remove({});
  });


  describe('GET /all', () => {
    it('should return all users', async () => {
      await User.collection.insertMany([

        { email : "tiffany@hotmail.com",
          name: "tiffany",
          password: "22222",
          usertype: "faculty",
          isAdmin: true,
          created_on: Date.now,
          last_login: Date.now
        },

        { email : "daniel1@hotmail.com",
          name: "Daniel",
          password: "2222dfasfa",
          usertype: "budget_office",
          isAdmin: true,
          created_on: Date.now,
          last_login: Date.now
        },

        { email : "randomUser@hotmail.coms",
          name: "randomUsers",
          password: "123123qwer",
          usertype: "budget_office",
          isAdmin: true,
          created_on: Date.now,
          last_login: Date.now
        },

        { email : "justin@gmail.com",
          name: "Justin",
          password: "2222222",
          usertype: "grad_office",
          isAdmin: true,
          created_on: Date.now,
          last_login: Date.now
        },

        { email : "daniel2@hotmail.com",
          name: "Daniel",
          password: "123456",
          usertype: "grad_office",
          isAdmin: true,
          created_on: Date.now,
          last_login: Date.now
        }
      ]);

      const res = await request(server).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(res.body.some(x => x.name === "Daniel"));
    });
  });

  describe('GET /self', () => {
    it('should return an user if valid id is passed', async () => {
      const user = new User(
        {
          email : "daniel@hotmail.com",
          password: "2222dfasfa",
          name: "Daniel",
          usertype: "budget_office",
          isAdmin: false,
          created_on: Date.now,
          last_login: Date.now
        });
      await user.save();
      const res = await request(server).get('/api/users/' + user._id);
      expect(res.status).toBe(200);
    });

    it('should return 404 if invalid id is passed', async () => {

      const res = await request(server).get('/api/users/' + '123');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 401 since user is not signed in', async () => {
      const user = new User(
        { 
          email : "daniel@hotmail.com",
          name: "Daniel",
          password: "2222dfasfa",
          usertype: "budget_office",
          isAdmin: false,
          created_on: Date.now,
          // last_login: Date.now
        });
      const res = await request(server).post('/api/users/').send(user);
      expect(res.status).toBe(401);
    });

    it('should return 400 if user json does not meet validation', async () => {
      const token = new User().generateAuthToken();
      const user = new User(
        {
          email : "daniel@hotmail.com",
          password: "2222dfasfa",
          name: "Daniel",
          usertype: "budget_office",
          isAdmin: false,
          created_on: Date.now,
          last_login: Date.now
        });
      const res = await request(server).post('/api/users/').set('x-auth-token', token).send(user);
      expect(res.status).toBe(400);
    });

    it('should save user in db if user is signed in/signed up and passes validation', async () => {
      const token = new User().generateAuthToken();
      const new_user = new User(
        {
          email : "daniel@hotmail.com",
          name: "Daniel",
          password: "2222dfasfa",
          usertype: "budget_office",
          isAdmin: false,
          created_on: Date.now,
          last_login: Date.now
        });
      const res = await request(server).post('/api/users/').set('x-auth-token', token).send(new_user);
      const query = await User.findById({"_email" : "daniel@hotmail.com"});
      console.log(new_user);
      console.log('value ' + query);
      expect(query).not.toBeNull();
    });
  });
});
