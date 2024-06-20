
## Author

- **Name**: Jared Hooker
- **Email**: jaredroberthooker@gmail.com
- **GitHub**: JRH89(https://github.com/jrh89)

# RESTful API for Dinosaur Facts with Supabase and Express.js

This tutorial demonstrates how to build a RESTful API using Supabase as the backend database and Express.js as the server framework. The API provides access to a dataset of dinosaur facts sourced from a free dataset available from Kaggle.

Full tutorial can be found a below, or at https://blog.hookerhillstudios.com/blogs/build-a-restful-api-with-supabase-and-express

[Dinosaur Dataset on Kaggle](https://www.kaggle.com/datasets/smruthiiii/dinosaur-dataset)

[GitHub Repository](https://github.com/jrh-89/express-dinosaur-api)


## Dataset Overview

The dataset contains information about dinosaurs, including their occurrence number, name, diet, type, dimensions, age, geographical region, and taxonomical classification. Here are the key attributes of the dataset:

| Field         | Description                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------|
| occurrence_no | The original occurrence number from the Paleobiology Database.                                    |
| name          | The accepted name of the dinosaur (genus name or name of the footprint/egg fossil).               |
| diet          | The main diet of the dinosaur (omnivorous, carnivorous, herbivorous).                              |
| type          | The type of dinosaur (small theropod, large theropod, sauropod, etc.).                             |
| length_m      | Maximum length of the dinosaur from head to tail, in meters.                                       |
| max_ma        | Age in million years of the first fossil records of the dinosaur.                                  |
| min_ma        | Age in million years of the last fossil records of the dinosaur.                                   |
| region        | Current region where the fossil record was found.                                                  |
| lng           | Longitude where the fossil record was found.                                                       |
| lat           | Latitude where the fossil record was found.                                                        |
| class         | Taxonomical class of the dinosaur (Saurischia or Ornithischia).                                    |
| family        | Taxonomical family of the dinosaur (if known).                                                     |

# Full Tutorial

## Introduction

Welcome to this comprehensive tutorial on building a RESTful API using Node.js, Express.js, and Supabase for a Dinosaur Facts Database. Whether you're a new or experienced developer looking to enhance your skills, this guide will walk you through creating a robust API that allows users to query fascinating dinosaur facts by name.

In this project, we'll utilize the power of Express.js, a fast and minimalist web framework for Node.js, and Supabase, an open-source Firebase alternative that provides a real-time database full of Dinosaur facts. By the end of this tutorial, you'll have a fully functional API capable of serving detailed information about various dinosaurs from our curated dataset provided by https://Kaggle.com.

### **Step 1: Set Up the Environment**

A. **Create a new directory for your project:**

```bash
mkdir express-dinosaur-api
cd express-dinosaur-api
```

B. **Initialize a new Node.js project:**

```bash
npm init -y
```

C. **Install necessary packages:**

```bash
npm install express @supabase/supabase-js dotenv
```

### **Step 2: Set Up Supabase**

A. **Create a Supabase account and project:**

    - Go to https://supabase.com, sign up, and create a new project.

B. **Get your Supabase project credentials:**

    - In your Supabase dashboard, navigate to the "Settings", then "API" and get your project URL and API key.

C. **Create a `dinosaur_facts` table in your Supabase project:**

    - In the Supabase dashboard, go to the "SQL" tab and execute the following SQL script to create the `dinosaur_facts` table:

    ```SQL
    CREATE TABLE dinosaur_facts (
    occurrence_no SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    diet TEXT,
    type TEXT,
    length_m FLOAT,
    max_ma FLOAT,
    min_ma FLOAT,
    region TEXT,
    lng FLOAT,
    lat FLOAT,
    class TEXT,
    family TEXT
    );
    ```

    - Download the dataset by clicking the button below:

        <a href="/data/dinosaurs.csv" download>
            <button style={{ backgroundColor: '#87CEEB', padding: '10px' }}>Download</button>
        </a>

    - Next, upload your dataset (e.g., CSV file) containing dinosaur facts into this table through the Supabase dashboard. 
       
        - Click "Table Editor" tab on the left-side navigation menu.
      
        - Select the 'dinosaur_facts' table created ealier in this step (2-C). 
      
        - Click "Import data via CSV" and follow the on screen prompts to upload the 'dinosaurs.csv' dataset.

### **Step 3: Create the Express.js Application**

A. **Create a new file named server.js and open it in your text editor:**

```javascript
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json());

// Routes
app.get('/api/dinosaurs', async (req, res) => {
    try {
        let { data, error } = await supabase.from('dinosaur_facts').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching dinosaurs:', error.message);
        res.status(500).json({ error: 'Error fetching dinosaurs' });
    }
});

app.get('/api/dinosaurs/:name', async (req, res) => {
    const { name } = req.params;
    try {
        let { data, error } = await supabase.from('dinosaur_facts').select('*').ilike('name', `%${name}%`);
        if (error) throw error;
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'Dinosaur not found' });
        }
    } catch (error) {
        console.error('Error fetching dinosaur:', error.message);
        res.status(500).json({ error: 'Error fetching dinosaur' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### **Step 4: Configure Environment Variables**

A. **Create a .env file in your project directory:**

```makefile
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Replace your_supabase_url and your_supabase_key with your actual Supabase project URL and API key.

## **Step 5: Testing the API**

A. **Run your Express.js application:**

```bash
node server.js
```

B. **Use 'curl' or a tool like Postman to test the API:**

Download and Install Curl:

Download the latest release at:
        https://curl.se/download.html

Extract the .zip

Add the location of the extracted folder to your system's PATH. <br/> (e.g. 'C:\curl-8.8.0\curl-8.8.0')

Example Usage:

Get dinosaur by name (e.g., "Gorgosaurus"):

```bash
curl http://localhost:3000/api/dinosaurs/Gorgosaurus
```

Response:

The JSON response for this query might look like this:

```json
[
    {
        "occurrence_no": 139242,
        "name": "Gorgosaurus",
        "diet": "carnivorous",
        "type": "large theropod",
        "length_m": 8.6,
        "max_ma": 83.5,
        "min_ma": 70.6,
        "region": "Alberta",
        "lng": -111.528732,
        "lat": 50.740726,
        "class": "Saurischia",
        "family": "Tyrannosauridae"
    },
    {
        "occurrence_no": 139250,
        "name": "Gorgosaurus",
        "diet": "carnivorous",
        "type": "large theropod",
        "length_m": 8.6,
        "max_ma": 83.5,
        "min_ma": 70.6,
        "region": "Alberta",
        "lng": -111.549347,
        "lat": 50.737015,
        "class": "Saurischia",
        "family": "Tyrannosauridae"
    }
]
```

### **Explanation:**

    - **Express.js Setup:** 
        The application uses Express.js to handle HTTP requests and responses.

    - **Supabase Integration:** 
        Supabase is integrated using the supabase-js client to perform database operations (selecting dinosaurs).

    - **Environment Variables:** 
        Environment variables (PORT, SUPABASE_URL, SUPABASE_KEY) are used to configure the application and connect to Supabase securely.

### FAQ

**What is Node.js?**
Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It's used for building fast and scalable server-side applications.

**What is Express.js?**
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the development of server-side logic.

**What is a RESTful API?**
A RESTful API is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol — the HTTP protocol.

**How does Express.js handle routing?**
Express.js handles routing using its .get(), .post(), .put(), .delete() methods, which correspond to HTTP GET, POST, PUT, and DELETE requests, respectively. Routes are defined based on URL paths.

**What are middleware functions in Express.js?**
Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can perform various tasks such as logging, authentication, and request parsing.

**Why use Supabase with Express.js?**
Supabase is an open-source alternative to Firebase that provides a suite of backend services like authentication, real-time databases, and storage. Integrating Supabase with Express.js allows you to easily add these functionalities to your application without managing infrastructure.

### **Resources and Documentation**

**Node.js Documentation:**
    - Node.js Official Documentation: https://nodejs.org/en/docs/
    - Node.js API Reference: https://nodejs.org/en/docs/guides/

**Express.js Documentation:**

    - Express.js Official Documentation: https://expressjs.com/en/starter/installing.html
    - Express.js Guide: https://expressjs.com/en/guide/routing.html

**RESTful API Design:**

    - REST API Tutorial: https://restfulapi.net/
    - RESTful API Design Guide: https://www.restapitutorial.com/

**Supabase Documentation:**

    - Supabase Official Documentation: https://supabase.io/docs
    - Getting Started with Supabase: https://supabase.io/docs/guides/with-js

**HTTP Methods:**

    - MDN Web Docs: HTTP Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

**JSON Guide:**

 - JSON Official Website: https://www.json.org/json-en.html
 - MDN Web Docs: JSON: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

# **Conclusion**

By following this tutorial, you've set up a RESTful API using Express.js and Supabase for managing and retrieving dinosaur facts. Users can query the API to fetch all dinosaur records or retrieve specific dinosaurs by name. This setup leverages Supabase for database management and Express.js for creating the API endpoints, providing a scalable and efficient solution for building your dinosaur fact database API using JavaScript.
