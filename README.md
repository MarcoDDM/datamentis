## Application for Testament
This is an application for creating and sending testament messages, built with the MERN stack and integrated with Google APIs including Gmail and Google Drive.

**Getting Started**

- Clone this repository to your local machine.
- Install the necessary dependencies with npm install.
- Set up a MongoDB database for the application.
- Create a .env file in the root directory with the following environment variables:
- MONGO_URI (the URI for your MongoDB database)
- JWT_SECRET (a secret key for JWT authentication)
- GOOGLE_CLIENT_ID (the client ID for your Google Cloud Platform project)
- GOOGLE_CLIENT_SECRET (the client secret for your Google Cloud Platform project)
- GOOGLE_REDIRECT_URI (the redirect URI for your Google Cloud Platform project)
- Set up a Google API project for the application and enable the Gmail API and Google Drive API.
- Download the credentials.json file for the Gmail API and save it to the server/config directory.
- Start the application with npm start.

**Usage**

Once the application is running, users can create an account and set up a testament message to be sent after a certain period of time. The message can include attachments from Google Drive, which can be uploaded directly from the application.

When the message is due to be sent, the application will use the Gmail API to send the message to the recipient. If the message is not confirmed, it will be sent to a pre-defined email list.

##Contributing
Contributions to this project are welcome. To contribute, please follow these steps:

- Fork this repository.
- Create a new branch with your changes: git checkout -b my-feature-branch.
- Make your changes and commit them: git commit -m 'Add some feature'.
- Push to the branch: git push origin my-feature-branch.
- Submit a pull request.

**License**
This project is licensed under the MIT License. See the LICENSE file for details.



