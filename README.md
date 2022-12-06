# ExpressAPI

**ExpressAPI - an FastAPI alternative written on Node.js and using express.js**

# Usage
- **How to get started?**<br>
***For the first you need download the api from npm(not published yet)***<br>
**Here is a template of ExpressAPI server:**
```js
const ExpressAPI = require('express_api');
const expressApi = new ExpressAPI(7300, 'localhost', "connectMessage");
expressApi.RouteGet('/', (req, res) => {
  res.send("Hello World");
}, new expressApi.ResponseModel({
  type: 'string',
  status: 200
}));
```

***Will be explained more in docs website of ExpressAPI(not finished)***
