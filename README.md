# Push Notifications

This project was generated with [.NET Core SDK](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x) version 3.1.100 and [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Using Docker
1. `cd Push-SPA`
2. `npm install`
3. `ng build` to create wwwroot in API
4. `cd .. && cd Push.API`
5. `docker-compose up`


## Start the Project in Release Configuration
1. Open a command prompt (terminal) under the root
2. `cd Push.API`
3. `dotnet run -c Release`
*This command includes `dotnet restore`, `npm install`, `ng build` and `dotnet run` 
4. Navigate to [http://localhost:5000/](http://localhost:5000/)

## Start the Project under Development Mode
#### Starting the backend
1. Open a command prompt (terminal) under the root
2. `cd Push.API`
3. `dotnet run` or `dotnet watch run`
#### Starting the frontend
4. Open a command prompt (terminal) under the root
5. `cd Push-SPA`
6. `ng serve`
7. Navigate to [http://localhost:4200/](http://localhost:4200/)
