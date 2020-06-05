const request = require('supertest');
const {Offer} = require('../../models/offer');
const {User} = require('../../models/user');
let server;

describe('/api/offers', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach( async () => {
    server.close();
    await Offer.remove({});
  });

  describe('GET /', () => {
    it('should return all offers', async () => {
      await Offer.collection.insertMany([
        // Offer 1
        { 
          ticket_id: "5a9d6cc70218",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "5a9d6cc70218274308",
          applicant: "Daniel",
          type: "domestic",
          professor: "John",
          status: "pending"
        },
        // Offer 2
        { 
          ticket_id: "5a9d6cc70219",
          applicant_id: "5a9d6cc70218274308a12744",  // change the applicant id for each status
          professor_id: "5a9d6cc70218274308",
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "approved"
        },
        // Offer 3
        { 
          ticket_id: "5a9d6cc70220",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "5a9d6cc70218274308",
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "rejected"
        },
        { 
          ticket_id: "5a9d6cc70221",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "5a9d6cc70218274308",
          applicant: "Daniel",
          type: "domestic",
          professor: "John",
          status: "accepted"
        },
        { 
          ticket_id: "5a9d6cc70222",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "5a9d6cc70218274308", 
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "declined"
        }
      ]);
      const res = await request(server).get('/api/offers');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(res.body.some(x => x.ticket_id === "5a9d6cc70218"));  // TO ADD
    });
  });
  
  describe('GET /:id', () => {
    it('should return an offer if valid id is passed', async () => {
      const offer = new Offer(
        // Offer 1
        { 
          ticket_id: "5a9d6cc70218",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "5a9d6cc70218274308", // temporal
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "declined"
        });

      await offer.save();
      const res = await request(server).get('/api/offers/' + offer._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('created_by', offer.created_by);
    });

    it('should return 404 if invalid id is passed', async () => {

      const res = await request(server).get('/api/offers/' + '5a9d6cc70218');
      expect(res.status).toBe(404);

    });
  });

  describe('POST /', () => {
    it('should return 401 since user is not signed in', async () => {
      const offer = new Offer(
        // Offer 1
        { 
          ticket_id: "5a9d6cc70218",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "",
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "declined"
        });
      const res = await request(server).post('/api/offers/').send(offer);
      expect(res.status).toBe(401);
    });
    it('should return 400 if offer json does not meet validation', async () => {
      const token = new User().generateAuthToken();
      const offer = new Offer(
        { ticket_id: "5a9d6cc70218",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "",
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "declined"
        });
      const res = await request(server).post('/api/offers/').set('x-auth-token', token).send(offer);
      expect(res.status).toBe(400);
    });

    //need to fix this....
    it('should save offer in db if user is signed in and passes validation', async () => {
      const token = new User().generateAuthToken();
      const new_offer = new Offer(
        // Offer 1
        { ticket_id: "5a9d6cc70218",
          applicant_id: "5a9d6cc70218274308a12744",
          professor_id: "",
          applicant: "Daniel",
          type: "international",
          professor: "John",
          status: "declined"
        });
      const res = await request(server).post('/api/offers/').set('x-auth-token', token).send(new_offer);
      const query = await Offer.findById({"_id" : "5a9d6cc70218274308a12744"});
      console.log(new_offer);
      console.log('value ' + query);
      expect(query).not.toBeNull();
    });
  });
});
