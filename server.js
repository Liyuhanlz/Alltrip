import http from "node:http";
import fs from "node:fs";

const routes = {
    "/":                { file: "pages/index.html",     type: "text/html"   },
    "/index.html":      { file: "pages/index.html",     type: "text/html"   },
    "/schedule.html":   { file: "pages/schedule.html",  type: "text/html"   },
    "/explore.html":    { file: "pages/explore.html",   type: "text/html"   },
    "/expenses.html":   { file: "pages/expenses.html",  type: "text/html"   },
    "/styles.css":      { file: "styles.css",           type: "text/css"    },
    "/script.js":       { file: "script.js",            type: "text/javascript"}
}

const server = http.createServer((request, response) => {

    console.log(request.method, request.url);
    const route = routes[request.url];

    if(!route) {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/plain");
        response.end("Not found!");
        return;
    }

    fs.readFile(route.file, (error, data) => {
        if (error) {
            response.statusCode = 500;
            response.end("Couldn't load...");
            return;
        }

        response.statusCode = 200;
        response.setHeader("Content-Type", route.type);
        response.end(data);
    });

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});