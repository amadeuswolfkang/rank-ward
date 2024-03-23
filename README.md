# rank-ward

rank-ward is a Discord bot that provides live stats for League of Legends players from the Riot Games APIs.

# Comprehensive Guide

## Set-up
I bootstrapped the project in create-react-app.
```npx create-react-app rank-ward```

You must create the repo on GitHub. You cannot initialize a GitHub repo in the command line. This is because Git and GitHub are 2 different things. Git is a version control system and GitHub is just a host for git repos. 

After creating the repo on GitHub, create a new remote called origin located at the URL of your remote repo. You can use SSH so you don't have to login every single time.
```git remote add origin ssh://git@github.com/your-account/your-repo.git```

For the first push, set the upstream branch (the -u flag). This will allow you to `git pull` without specifying the branch to pull from.
```git push -u origin main```

From now on, you can just do `git push` and `git pull`.

## APIs

Riot Games has APIs you can use for free.
[Riot Games Developer Portal](https://developer.riotgames.com/).

Discord also has an API that lets you make bots.
[Discord Developer Portal](https://discord.com/developers/docs/intro).

## Deploying the app

Locally preview the react app.
`npm start`

Build and deploy the react app.
`npm run deploy`
