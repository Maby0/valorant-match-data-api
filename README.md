## VALPAL
Utilising HenrikDev System's Valorant Match Data API

A serverless app that collects Valorant match data for a select player. 
The data can then be used to pull various statistics such as winrate and KDA to better track progress and highest performing team compositions.
The app is integrated with Discord, using the slash command, the user can choose what type of data aggregation they're interested in.\
For example:

<img width="1024" alt="Screenshot 2024-07-31 at 16 11 11" src="https://github.com/user-attachments/assets/a829a346-2765-44fd-af5d-eb005922b8e6">\
The app is designed in such a way that new data aggregations can be worked on in a decoupled manner, thus reducing impact on the existing app during development.

Requirements to develop:
- NodeJS
- SAM CLI
- Set of AWS IAM credentials
