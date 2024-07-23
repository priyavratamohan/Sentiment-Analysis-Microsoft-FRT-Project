---
title: Test
---
# Sentiment-Analysis-Microsoft-FRT-Project

The core idea of this project is to provide a web application that automates sentiment analysis using Azure AI Language Services and stores user inputs in Azure Cosmos DB.

Organizations often face the challenge of manually analyzing large volumes of text data to extract sentiment insights. This process is typically time-consuming, labor-intensive, and prone to inaccuracies, impeding timely and informed decision-making.

Our project addresses this problem by developing a web application that leverages Azure Cognitive Services for automated sentiment analysis, Azure Cosmos DB for seamless data storage and retrieval, and an easy-to-navigate user interface. Key features include:

- Users can input text and instantly receive quantified sentiment analysis results (positive, negative, or neutral) rated with precision up to two decimal points.
- The application stores user inputs when prompted, allowing users to revisit and reanalyze previous entries.
- A sidebar displays saved inputs with options to load them into the text area, add new inputs, and delete entries.
- Integration with Azure Cosmos DB ensures efficient storage and retrieval of user inputs.
- Deployment on Azure App Service ensures scalability and reliability.

Consider a customer support department in a large retail company that receives thousands of customer feedback entries daily. Manually analyzing this feedback to gauge customer sentiment is impractical and inefficient. By implementing our sentiment analysis web application, the retail company can automate the sentiment analysis process. Customer support agents can input feedback directly into the application and receive immediate sentiment analysis results, enhancing customer satisfaction, monitoring brand health, and optimizing marketing strategies.

This project solves the inefficiencies in manual sentiment analysis, enabling organizations to leverage real-time insights for better decision-making and improved customer engagement.

## Steps to Run the Sentiment Analysis Web Application Locally

### Prerequisites:

1. Node.js: Ensure you have Node.js installed. You can download it from [nodejs.org](http://nodejs.org).
2. Azure Subscription: You need an Azure account to access Azure Cognitive Services and Azure Cosmos DB.
3. Git: Ensure you have Git installed to clone the repository.

### Setup

**1. Clone the Repository**

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/priyavratamohan/Sentiment-Analysis-Microsoft-FRT-Project.git
cd Sentiment-Analysis-Microsoft-FRT-Project
```

**2. Install Dependencies**

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

**3. Configure Environment Variables**

Create a .env file in the root directory of your project and add your Azure Cognitive Services and Cosmos DB credentials. The file should look like this:

```plaintext
ENDPOINT=<your_cognitive_services_endpoint>
LANGUAGE_API_KEY=<your_language_api_key>
COSMOS_DB_ENDPOINT=<your_cosmos_db_endpoint>
COSMOS_DB_KEY=<your_cosmos_db_key>
COSMOS_DB_DATABASE=<your_cosmos_db_database_name>
COSMOS_DB_CONTAINER=<your_cosmos_db_container_name>
```

Replace the placeholders with your actual Azure service credentials.

**4. Run the Application**

Start the application using the following command:

```bash
npm start
```

**5. Access the Application**

Open your web browser and go to `http://localhost:3000` to access the sentiment analysis web application.

<SwmMeta version="3.0.0"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
