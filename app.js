const http = require('http');
const qs = require('qs');

let users = [
    {
        name: 'Phan Van Luan'
    },
    {
        name: 'Phan Van Luan'
    },
    {
        name: 'Phan Van Luan'
    },
    {
        name: 'Nguyen quang tai'
    },
]

const server = http.createServer(((req, res) => {

    let pathUrl = req.url;
    if (pathUrl === '/search' && req.method ==='POST') {
        let data = ''
        req.on('data', chunk =>  {
            data += chunk;
        })

        req.on('end', () => {
            data = qs.parse(data)
            let result =  users.filter(item => {
                return item.name === data.name
            });

            let message = 'Tim duoc ' + result.length + ' ket qua cho tu khoa: ' + data.name;
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(message);
            res.write('<a href="/">Quay lai</a>')
            res.end();
        })

    } else {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write('<form method="post" action="/search">')
        res.write('<input type="text" name="name">')
        res.write('<input type="submit" value="Search">')
        res.write('</form>')
        res.end();
    }
}))

server.listen(8080,'localhost', function () {
    console.log('server running')
})


