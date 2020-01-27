FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build-env
WORKDIR /api
EXPOSE 5000

COPY Push.API.csproj ./
RUN dotnet restore Push.API.csproj

COPY . ./

RUN dotnet publish Push.API.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /api
COPY --from=build-env /api/out .
ENTRYPOINT ["dotnet", "Push.API.dll"]