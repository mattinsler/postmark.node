# postmark.node

Postmark Client for Node.js

## Installation
```
npm install postmark.node
```

## Usage

```javascript
var Postmark = require('postmark.node');

var client = new Postmark({api_key: '...'});

// Check fields at http://developer.postmarkapp.com/developer-api-email.html
client.emails.send({
  To: 'foo@bar.com',
  From: 'Matt Insler <matt.insler@gmail.com>',
  Subject: 'I like puppies',
  HtmlBody: '<b>PUPPIES!!!</b>'
});

client.emails.batch([{
  To: 'foo@bar.com',
  From: 'Matt Insler <matt.insler@gmail.com>',
  Subject: 'I like puppies',
  HtmlBody: '<b>PUPPIES!!!</b>'
}, {
  To: 'baz@example.com',
  From: 'Matt Insler <matt.insler@gmail.com>',
  Subject: 'I like puppies',
  HtmlBody: '<b>PUPPIES!!!</b>'
}]);
```

## License
Copyright (c) 2014 Matt Insler  
Licensed under the MIT license.
