# Project: RESTful API for Dinosaur Facts with Supabase and Express.js

This project demonstrates how to build a RESTful API using Supabase as the backend database and Express.js as the server framework. The API provides access to a dataset of dinosaur facts sourced from a free dataset available on Kaggle.

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

## Project Setup

To run this project locally or deploy it to a cloud platform, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   
2. **Navigate to the Project Directory**: Open a terminal or command prompt and change directory to the cloned repository.
   
3. **Install Dependencies**: Install the required dependencies using npm. You can do this by running `npm install` in your terminal.
   
4. **Set up Environment Variables**: Create a `.env` file in the root directory of your project. In this file, add the following environment variables:
   - `SUPABASE_URL`: This should be set to your Supabase project URL.
   - `SUPABASE_KEY`: This should be set to your Supabase project API key.
   
   Replace `your-supabase-url` and `your-supabase-api-key` with your actual Supabase URL and API key. You can obtain these from your Supabase project settings.

5. **Start the Server**: Once dependencies are installed and environment variables are set, start the Express.js server by running `npm start` in your terminal.

6. **Access the API**: After starting the server, you can access the API endpoints to retrieve dinosaur facts.

## API Endpoints

### Search Dinosaur by Name

- **'GET /dinosaurs?name=:name'**: Retrieve dinosaur records by name. Replace `:name` with the name of the dinosaur you want to search for.

Example: 

```bash
GET /dinosaurs?name=:name
```

Response:

```json
{
  "occurrence_no": 428,
  "name": "Stegosaurus",
  "diet": "herbivorous",
  "type": "ornithischian",
  "length_m": 9,
  "max_ma": 155,
  "min_ma": 145,
  "region": "North America",
  "lng": -108.5,
  "lat": 38.8,
  "class": "Ornithischia",
  "family": "Stegosauridae"
}
```
