const request = require('supertest');
const {Ticket} = require('../../models/ticket');
const {User} = require('../../models/user');
let server;
const port = process.env.PORT || 8000;

describe('/api/tickets', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach( async () => {
    server.close();
    await Ticket.remove({});
  });


  describe('GET /', () => {
    it('should return all tickets', async () => {
      await Ticket.collection.insertMany([
        { 
          professor : "Professor John",
          professor_id: "5a9d6cc70218274308a",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        },
       
        { 
          professor : "Professor Justin",
          professor_id: "5a9d6cc70218274308b",
          status: "redeemed",
          created_by: "John",
          created_on: Date,
        },
        
        { 
          professor : "Professor John",
          professor_id: "5a9d6cc70218274308c",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        }
      ]);

      const res = await request(server).get('/api/tickets');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some(x => x.professor === "Professor John"));
      expect(res.body.some(x => x.status === "granted"));
      expect(res.body.some(x => x.created_by === "Daniel"));
      // expect(res.body.some(x => x.professor_id === "")); //////  COMEBACK 
    });
  });

  describe('GET /:id', () => {
    it('should return a ticket if valid id is passed', async () => {
      const ticket = new Ticket(
        { 
          professor_id: "5a9d6cc70218274308a",
          professor : "Professor John",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        });
      await ticket.save();
      const res = await request(server).get('/api/tickets/' + ticket._id);
      expect(res.status).toBe(200);
    });

    it('should return 404 if invalid id is passed', async () => {

      const res = await request(server).get('/api/tickets/' + ObjectId('123'));
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 401 since user is not signed in', async () => {
      const ticket = new Ticket(
        // Ticket 1
        { 
          professor : "Professor John",
          professor_id: "5a9d6cc70218274308a",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        });
      const res = await request(server).post('/api/tickets/').send(ticket);  // router took out authorize
      // const res = await request(server).post('/api/tickets/');
      expect(res.status).toBe(401);
    });

    it ('should return 400 if user json does not meet validation', async () => {
      const token = new User().generateAuthToken();
      const ticket = new Ticket(
        {
          professor_id: "5a9d6cc70218274308a",
          professor : "Professor John",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        });
      const res = await request(server).post('/api/tickets/').set('x-auth-token', token).send(ticket);
      expect(res.status).toBe(400);
    });

    //need to fix this....
    it('should save ticket in db if user is signed in/signed up and passes validation', async () => {
      const token = new User().generateAuthToken();
      const new_ticket = new Ticket(
        // ticket 1
        {
          professor_id: "5a9d6cc70218274308a",
          professor : "Professor John",
          status: "granted",
          created_by: "Daniel",
          created_on: Date,
        });
      const res = await request(server).post('/api/tickets/').set('x-auth-token', token).send(new_ticket);
      const query = await Ticket.findById({"professor_id" : "5a9d6cc70218274308a"});
      console.log(new_ticket);
      console.log('value ' + query);
      expect(query).not.toBeNull();
    });
  });

});
