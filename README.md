# Gallery

Gallery is a website application that allows users to search through the Art Institue of Chicago's databse and collect their favorite artworks. Includes random artwork generator. Technologies used: TypeScript, MERN (MongoDB, Express, React + Router, Node), RESTful API, third party API. App is capable of CRD functionality.

## Fun Feature
Checkout the random search generator on the Search Artworks page!

# Developer Notes

The main focus of the project was to learn and utilize a personally novel piece of technology. I chose to incorporate TypeScript due to the versatility of the language with varous frame works. Furthermore, I enjoy and prefer to use MERN for full stack development over other alternatives. 

## Approach

The approach taken to this project was to first learn how to interact with my third party API. Understanding the structure, taking note of desired properties, and grabbing certain URLs (image source, update link) in the beginning stages makes building a functional application a lot easier. In regards to React Router and TypeScript, I held more of a 'learn as you go' approach instead of overloading myself with information.

## Key Challenges 

The most difficult part of this process was dealing with React Router. I was able to achieve Create functions but not Read functions for the user's favorite artworks. This was due to the fact that the third party API and my RESTful API were both contrubiting 'ID' properties to the object, 'id' and '_id'. My frontend routes for reading the object were '/artwork/:id' and '/artwork/:_id'. The app was able to read searched objects (id), but not added objects (_id). This threw me a multitude of axios errors no matter how I reconfigured the frontend.

Due to the fact that my nearly identical routes were confusing React, I figured it would be more effective just to create a separate route entirely to differentiate searched and added artworks. I added an identical schema to my original Artwork schema labled MyArtwork and updated my server routes accordingly. Create functions would continue to read from '/artworks/:id' but now create functions would post to '/my-artworks/:_id'. This solved the issue, and allowed me to achieve full CRD functionality. Update functions were omitted due to lack of necessity 

 All of these tools weren't necessarily dificult to work with on their own. However, the concurrence of these technologies, and the fact that two of them were completely new to me, did pose some challenges. 

 ## Extra

 My favorite feature of this project is the random search generator, and I actually decided to implement this a day before my deadline. The search function involves several steps. First, a random word is generated and then plugged into the API request as search parameter. The search will return an array of objects; each object containing a few key pieces of information about an artwork that matched the random word. Next, an id is grabbed from the first index of the array, and then that id is used as a search parameter in another request to the API. Finally, the data from that request is used to populate the random artwork interface.

 I've considered adding authentication to this project in the future. For now, I would actually prefer it reamins without. Each person that accesses the website will be able to view artworks that others have added, as well as add their own. It will be very interesting to see how the collection of artworks changes over time with multiple people accessing the database.

 I hope you enjoy using this application as much as I enjoyed making it. :) 

