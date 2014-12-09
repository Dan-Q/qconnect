QConnect
========

At the 2014 [Emerging Tech Weekender](http://emergingtechweekender.co.uk/) hackathon weekend, a team comprising one restraunteur, three software engineers, and a graphic designer spent two days putting together this tool, QConnect, which aimed to streamline queue management using people-sensing cameras, intelligent automation, and the mobile web. We imagined a world in which customers waiting in (or planning to join) queues could scan a QR code or NFC tag and be taken to a web page that gave them a live estimate of their wait time, and through which vendors could encourage particular behaviour (e.g. moving to a nearby alternate outlet, or "hanging in there" if the queue was long) in exchange for perks like shorter wait times and even discount vouchers. We believe that this is of particular value to non-competing vendors in close geographical proximity, such as food outlets across a university campus, coffee chains with multiple branches in a city centre, and theme parks.

Later, we came to realise that the potential for this kind of software goes further, allowing businesses themselves to understand and manipulate queues to their best interest, to generate the "buzz" of a queue while still maintaining throughput, to make the most-effective use of staff time, or to plan for the most cost-effective way to handle busy and quiet times of the day or week.

Understanding this code
-----------------------

**Important: this code is not even remotely production-grade. Do not attempt to use it in a production environment.**

The code uses [Firebase](https://www.firebase.com) as a data store. The camera application (Python? Currently missing from the repo) estimates wait time based on an image of queue length captures from a digital camera and pushes data to the Firebase instance. The manipulator (Javascript, formerly Ruby, in the business-logic directory) interprets this data and applies discounts to customers in particular queues. A web application (HTML/CSS/JS, in the app directory; sample lighttpd configuration provided) presents these discounts to users in particular queues. A mockup admin interface (Bootstrap-based) can be found in the admin-panel directory.

License (MIT)
-------------

Copyright (c) 2014 Team QConnect (https://github.com/avapoet/qconnect)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.