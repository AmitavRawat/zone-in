# ZONE IN - Urban Zoning , now made more accessible and less daunting!

### Background

American city planning is complex, and the intricate web of zoning codes stands as a testament to organized development. Navigating the labyrinth of zoning codes can be a nightmare for homeowners and businesses. Simple queries like, “Can I build a deck in my backyard?” or “Is a home-based daycare permissible?” become daunting expeditions through pages texts.

Our solution - Zone In! Our beacon of clarity in the convoluted maze of urban zoning. With an emphasis on user-friendly interfaces and straightforward information retrieval, our project aspires to demystify zoning regulations by transforming their perplexities into understanding. Leveraging the Google Maps API, Zone In provides a unique visual experience where users can not only navigate the street view to capture a present image of their residence but can also envision potential changes through advanced image generation technologies.

So now, our users are one prompt away from knowing if they can exapand their drive-way and one prompt away from seeing what this drive-way would look like! YES!

### How we built this 

Let's talk about the model we really take pride in!

First, we start by loading in the documents and splitting the text using TextSplitter in which we chunked out the data bceause we didn't have the computing power to deal with the over 800 pages of zoning code data in evanston alone. Then , we used an embeddings model through HuggingFace to utilize the power of semantic search more effecitvely as it groups semantically similar words more closely to create vector embeddings. These embedddings are stored in a vectorestore powered by ChromaDB which allow the model to retrieve the information by semantic similarity rather than keyword matching. Finally the prompt is engineered nad passed through the model constructed by Langchain, which further goes into our RAG  (Retrieval-Augmented Generation) chain that uses the retriever to gain context, formats the query to be the prompt, and uses the GPT-4 model developed earlier via the Open AI API to generate an output that is formatted and passed through in the display. Impressive isn't it! 

Now , our customised and improved image generation model!

Our approach for the stable diffusion model is rather unique - believe us. Initially, we started by working image to image models. Firstly, we started by using CLIP (Contrastive Language–Image Pre-training) . However, with a lack of documentation and a rather new concept, we looked into other ways to execute out stable diffusion. now we have a multimodal process. first we start by passing in an image of a house and using context system messages via langchain API to gear the model to analyze the image at the finest grain it can. then using its text output of the analysis it integrates the modification and analyzes the features that would be changed. finally, given all of that we pass the prompt passed with all feature information gathered into a DALL E model that generates teh closest realistic render possible. we have recognized  that there are some faults in the images but DALL E is obviously still a developing technology.


### What it does

In today's rapidly evolving urban landscapes, "Zone In" is a much-needed tool that bridges the gap between technology and urban planning. It empowers users to make informed decisions, comply with zoning regulations, and visualize future developments, all from the comfort of their own homes.

"Zone In" is a cutting-edge web application designed to make urban planning and zoning regulation compliance friendlier and accessible. We open with a visually captivating landing page created using Three.js, which is seamlessly integrated with React.js and Material UI to ensure a smooth and engaging user experience.

The application utilizes the Google Maps API to display a detailed map of the user's area. Users can search for their address and explore their surroundings in real-time through the street view feature, providing a comprehensive understanding of their neighborhood's layout and infrastructure.One of the standout features of "Zone In" is its ability to capture images of users' houses. This is powered by Selenium, which automates the process, ensuring accuracy and efficiency.

Once the user captures the desired image, they can interact with our chatbot, which is designed to answer any zoning regulation questions swiftly and accurately. We are aware of users' zone code through the address they typed in, This feature is invaluable for homeowners, architects, and urban planners who need quick answers to complex zoning questions.

Additionally, "Zone In" boasts a second chatbot powered by advanced image generation technologies. This chatbot allows users to envision potential changes to their property or neighborhood, aiding in the planning and approval process of urban development projects. Again, the screenshot user saved helps us create realistic real-time images all in no time.

### Challenges we ran into

1) Processing both image and textual information challenged us to explore using the CLIP (Contrastive Language–Image Pre-training) pre-trained text and image encoders to create embeddings which are semantically rich
which can be used to relate ideas and objects present within the image to textual descriptions. We are very proud of our image generation as we tried our best efforts to recreate the most realistic version of a house/bussiness with changes the
user asked for using street view capture which enabled us to make our own model for image generation for a given scene! we wonder how this model can be used in the real world to speed up or completely automate the image generation for urban planning purposes.

2) Our landing page made using ThreeJS definitely took a lot of time as this was our first time using it. It was challenging but very exciting! Where else would we learn if not in a hackathon?

3) When we say zoning codes are voluminous, THEY ARE VOLUMINOUS! We definitely needed more computing power to be able to process and train our LLM model with all the zoning codes other than just a subsection of Evanston that we were able to process with current resources.


### Whats next?

1) We want to expand from just subsections of Evanston to bigger cities which will need more computing resources.
2) We only had sufficient time to come up with a model for conversational AI and a model for image generation. We would want to make the image rendering much better and more accurate.
3) Integration of Advanced Technologies-  we are exploring the integration of cutting-edge technologies such as augmented reality (AR) and virtual reality (VR) into "Zone In." These technologies have the potential to provide users with an immersive experience, allowing them to interact with their urban environment in new and exciting ways.
4) Finally, Collaboration with Local Authorities to ensure that "Zone In" is as effective and relevant as possible, we plan to collaborate closely with local government agencies and urban planning departments. By working together, we can ensure that our tool aligns with the latest zoning regulations and urban development strategies, providing users with the most up-to-date information.
