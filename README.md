# Origins-Drift
Website for Origins Drift Club. Created using [Next-JS](https://nextjs.org/) by [Vercel](https://vercel.com)

This is a hobby project I started for a drift club within Forza Horizon 5. It's a game I've got several thousand hours into it and the Forza community is something dear to my heart. This massive project is a showcase of my love for the game with hundreds of hours put behind it. Its main purpose is to provide a place for members to submit their best scores for each track. The overall goal is to make an entire community behind it with shareable tunes, cars lookup, public profiles, and more, all free and open source.

Creating an account to get started submitting your scores is as simple as logging in with your Discord. You can then also edit your public profile by setting a display name, write an about me, choose your platform, and more to be displayed publicly. Each score you submit is a new entry, allowing you to track your progression over time with charts and other data on a per-track and per-class basis.

To install:
- Run `npm install` to install dependencies
- rename `.env.default` to `.env.development`
  - edit the variables to your needs and mind the annotations
- Run `npm run dev` to run dev environment with https
   - Default URL: `https://127.0.0.1:3000`
- For production environment, you can use `npm run build` then `npm run start` to start up the production server. (assuming a successful build)
  - note that you will also need a `.env.production` for this to work with identical settings from the `.env.development`

For Vercel deployments:
- After importing from github, you need environment variables. **Do NOT publish an edited .env file to a public repo. you will expose your private keys!**
- Click on the project, and hit "Settings" at the top to find environment variables.
- You can copy and paste the entire contents of the env file to get everything set instantly. Vercel makes this pretty easy.
  
### Credits:
Cars API endpoint data provided from here then coverted and stored in a SQL database:
https://www.kaggle.com/datasets/harryth129/forza-horizon-5-cars-dataset
