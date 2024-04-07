# ZONE IN - Urban Planning , now made more accessible and less daunting!

### Background

In the intricate mosaic of American urban planning, the intricate web of zoning codes stands as a testament to organized development. Navigating the labyrinth of zoning codes can be a nightmare for homeowners and businesses. Simple queries like, “Can I build a deck in my backyard?” or “Is a home-based daycare permissible?” become daunting expeditions through voluminous texts.

Our solution - Zone In! Our beacon of clarity in the convoluted maze of urban zoning. With an emphasis on user-friendly interfaces and straightforward information retrieval, our project aspires to demystify zoning regulations, transforming perplexity into understanding. Leveraging the Google Maps API, Zone In provides a unique visual experience where users can not only navigate the street view to capture a present image of their residence but can also envision potential changes through advanced image generation technologies.

So now, our users are one prompt away from knowing if they can exapand their drive-way and one prompt away from seeing what this drive-way would look like! YES

### How we built this 


### ### What it does


### Challenges we ran into

1) Processing both image and textual information challenged us to explore using the CLIP (Contrastive Language–Image Pre-training) pre-trained text and image encoders to create embeddings which are semantically rich
which can be used to relate ideas and objects present within the image to textual descriptions. We are very proud of our image generation as we tried our best efforts to recreate the most realistic version of a house/bussiness with changes the
user asked for using street view capture which enabled us to make our own model for image generation for a given scene! we wonder how this model can be used in the real world to speed up or completely automate the image generation for urban planning purposes.

2) Our landing page made using ThreeJS definitely took a lot of time as this was our first time using it. It was challenging but very exciting! Where else would we learn if not in a hackathon?

3) When we say zoning codes are voluminous, THEY ARE VOLUMINOUS! We definitely needed more computing power to be able to process and train our LLM model with all the zoning codes other than just a subsection of Evanston that we were able to process with current resources.


### Whats next?
