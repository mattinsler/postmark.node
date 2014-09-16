Postmark = require '../lib/postmark'
client = new Postmark(api_key: process.env.POSTMARK_API_KEY)

client.emails.send(
  From: 'matt@awesometalk.com'
  To: 'matt.insler@gmail.com'
  Subject: 'I like puppies',
  HtmlBody: '<b>PUPPIES!!!</b>'
)
.then -> console.log 'then', arguments
.catch (err) -> console.log 'catch', err.stack
.finally -> console.log 'finally', arguments

client.emails.batch([
  From: 'matt@awesometalk.com'
  To: 'matt.insler@gmail.com'
  Subject: 'I like puppies',
  HtmlBody: '<b>PUPPIES!!!</b>'
])
.then -> console.log 'then', arguments
.catch (err) -> console.log 'catch', err.stack
.finally -> console.log 'finally', arguments
