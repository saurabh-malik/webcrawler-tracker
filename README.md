# webcrawler-tracker
This is a Node.js service which receives and track the web resource URL for crawling. This service initiate the crawling and holds the rules for crawling, such as no URL is crawled twice within a timeframe.

Requirement:
- Download latest version of Node.js.
- Download and run the MongoDB Server on its default port.
- Download and run the RabbitMQ server.

Download the code and run following commands:
- npm install
- PORT=9090 run

webcrawler-tracker service must be up and running now to accept the resource as a request for web crawling.

```API
POST http://localhost:7575/api/resources

{
  "resourceURL":"http://wiprodigital.com”
}
```
*Run webcrawler service to start the crawling*
