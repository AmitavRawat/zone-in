from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain.community import ChatOpenAI
from langchain.schema.runnable import RunnablePassthrough, RunnableConfig
from langchain.schema.output_parser import StrOutputParser
import chainlit as cl

# Initialize the document loader, text splitter, embeddings, vector store, and chat model
loader = TextLoader('r1r2r3.txt')
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(documents=chunks, embedding=embeddings)
retriever = vectorstore.as_retriever()

prompt_template = """You are an assistant for question-answering tasks.
Use the following pieces of retrieved context to answer the question.  
Assume every user lives in an R1 area unless told otherwise.

Question: {question} 
Context: {context} 
Answer:
"""

openai_api_key = "INSERT OPEN AI API KEY"

@cl.on_chat_start
async def on_chat_start():
    prompt = ChatPromptTemplate.from_template(prompt_template)

    llm = ChatOpenAI(temperature=0, model_name='gpt-4', openai_api_key=openai_api_key)

    rag_chain = (
        {"context": retriever,  "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    cl.user_session.set("runnable", rag_chain)


@cl.on_message
async def on_message(message: cl.Message):

    runnable = cl.user_session.get("runnable")  # type: Runnable

    msg = cl.Message(content="")

    async for chunk in runnable.astream(
        {"question": message.content},
        config=RunnableConfig(callbacks=[cl.LangchainCallbackHandler()]),
    ):
        await msg.stream_token(chunk)

    await msg.send()

