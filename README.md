# Awesome Project to upload and download APIs using s3pre-signed-url

Steps to run this project:

1. Run `npm i` command
2. Setup env file by inside bin folder
        bin structure:: bin/.env.dev

        #Client interacting port
        PORT = 8000
        #S3
        AWS_S3_ACCESS_KEY= ----------
        AWS_S3_KEY_SECRET= -----------
        S3_REGION= ------
        AWS_S3_BUCKET= ------
        S3_FOLDER="-------"

3. Start the Server  
        `npm run dev`

4. Swagger URL
        `http://localhost:8000/swagger`

5. Hit the API using swagger or Postman