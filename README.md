# Origins-Drift
Website for Origins Drift Club. A serverless full-stack web application using NextJS and external databasing such as TiDB-Cloud. Uses Sequelize ORM package for database handling, TailwindCSS for designing the website itself, and Better-Auth for OAuth handling. 

Cars API endpoint data provided from here:
https://www.kaggle.com/datasets/harryth129/forza-horizon-5-cars-dataset

Once connected via Discord OAuth and in our official Discord, users can track their scores for each individual track on various games such as Forza Horizon 5 and Forza Horizon 6, of course which is fully manageable in the admin dashboard and is not limited to just these games. The signup process will check if the user is in the official Discord with a specific role to ensure only valid members can submit scores. Scores are accumulative, so if a user submits more than one score for a track, it will keep track of all scores for that user on that track that they've submitted. This will essentially allow for charts to show progress over time on as specific track.

