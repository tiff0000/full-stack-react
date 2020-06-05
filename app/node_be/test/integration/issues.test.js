const request = require('supertest');
const {Issue} = require('../../models/issue');
const {User} = require('../../models/user');
let server;
const port = process.env.PORT || 7777;

describe('/api/issues', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach( async () => {
    server.close();
    await Issue.remove({});
  });

  describe('GET /all', () => {
    it('should return all issues', async () => {

      await Issue.collection.insertMany([
        // Issue 1
        { created_by : "Steven",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue 1!",
          description: "Issue 1",
          status: "open",
          priority: "medium",
        },
        // Issue 2
        { created_by : "Alex",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue 2!",
          description: "Issue 2",
          status: "closed",
          priority: "medium",
        },
        // Issue 3...
        { created_by : "Jenny",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue 3!",
          description: "Issue 3",
          status: "closed",
          priority: "high",
        },
        { created_by : "Mr. Singh",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue 4!",
          description: "Issue 4",
          status: "open",
          priority: "low",
        },
        { created_by : "Dummy",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue 5!",
          description: "Issue 5",
          status: "closed",
          priority: "low",
        }
      ]);
      const res = await request(server).get('/api/issues');
      const token = new User().generateAuthToken();
      const authenticate = await request(server).post('/api/authenticate');

      expect(res.status).toBe(200);
      // expect(res.body.length).toBe(undefined);
      expect(res.body.some(x => x.name === "Alex"));
    });
  });
  
  describe('GET /:id', () => {
    it('should return an issue if valid id is passed', async () => {
      const issue = new Issue(
        { 
          created_by : "Jimmy",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue x!",
          description: "Issue 100",
          status: "closed",
          priority: "low",
        });
      await issue.save();
      const res = await request(server).get('/api/issues/' + issue._id);
      expect(res.body.length).toBe(0);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('created_by', issue.created_by);
    });

    // added
    it('should return 401 since user is not signed in', async () => {
      const issue = new Issue(
        // Issue 1
        { 
          created_by : "Donny",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue!",
          description: "Issue 99",
          status: "closed",
          priority: "high"
        });
      const res = await request(server).post('/api/issues/').send(issue);
      expect(res.status).toBe(401);
    });

    it('should return 404 if invalid id is passed', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server).get('/api/issues/' + '123');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('should return 401 since user is not signed in', async () => {
      const issue = new Issue(
        // Issue 1
        { 
          created_by : "Donny",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue x!",
          description: "Issue 99",
          status: "closed",
          priority: "high"
        });
      const res = await request(server).post('/api/issues/').send(issue);
      expect(res.status).toBe(401);
    });
    it('should return 400 if issue json does not meet validation', async () => {
      const token = new User().generateAuthToken();
      const issue = new Issue(
        { 
          created_by : "A",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue x!",
          description: "I",
          status: "closed",
          priority: "high"
        });
      const res = await request(server).post('/api/issues/').set('x-auth-token', token).send(issue);
      expect(res.status).toBe(400);
    });

    //need to fix this....
    it('should save issue in db if user is signed in and passes validation', async () => {
      const token = new User().generateAuthToken();
      const new_issue = new Issue(
        { 
          created_by : "Test Person",
          created_by_id: "5a9d6cc70218274308a12744",
          title: "Very urgent issue x!",
          description: "should save in db",
          status: "closed",
          priority: "high"
        });
      const res = await request(server).post('/api/issues/').set('x-auth-token', token).send(new_issue);
      const query = await Issue.findById({"_id" : "5a9d6cc70218274308a12744"});
      console.log(new_issue);
      console.log('value ' + query);
      expect(res.status).toBe(200);
      expect(query).not.toBeNull();
    });
  });
});
