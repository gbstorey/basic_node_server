const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method
    res.setHeader("Content-Type", "text/html");

    if (url === "/") {
        res.write("<http>");
        res.write("<head><title>Welcome</title></head>");
        res.write("<body><h1>Welcome!</h1></body>");
        res.write("<form action='/create-user' method='POST'><label>Your Username:</label><input type='text' name='username'/><button type='submit'>Submit</button></form>")
        res.write("</http>");
        return res.end();
    }
    if (url === "/users") {
        res.write("<http>");
        res.write("<head><title>Users</title></head>");
        res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>")
        res.write("</http>");
        return res.end();
    }
    if (url === "/create-user" && method === "POST") {
        const body = []
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedUsername = Buffer.concat(body).toString();
            const username = parsedUsername.split("=")[1];
            console.log(username);
            res.writeHead(302, {Location: '/'});
            return res.end();
        })
    }
});

server.listen(3000);