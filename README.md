## Nixty-bank-hosted (frontend)
This is a little modified Nixty-bank project, specifically for hosting.<br>
### The issue
In the original Nixty-bank project, I was using cookie to store jwt, and I sent them to frontend for saving in browser, but due to frontend and backend being on different domains, there was security issue, and it was overall complex.<br>
So what i really changed here is, how is jwt stored. Except in cookie, it'll be stored in localstorage now, so logging out will delete the token from localstorage.<br>
Any changes made in <a href="https://github.com/nitin-is-me/nixty-bank">Nixty-bank</a> will be updated in the hosted version as well. <br>
Here's the backend of this hosted version : <a href="https://github.com/nixty-bank-hosted-backend">Backend</a> <br>
Here's Nixty bank live: <a href="https://nixty-bank.vercel.app">Nixty-bank</a>
