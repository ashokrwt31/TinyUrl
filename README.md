# TinyUrl

In the project directory, you can run:

sh startapp.sh script from console to run application on browser 

This command will start your mongodb server.

After starting mongodb server it will start yout redis server for caching.

Once these two will start, it will start your app in browser.

Open http://localhost:2000 to view it in the browser.

shell commands which will execute when you run startapp.sh shell script.

echo "Starting mongodb-community@4.2......"

echo brew services start mongodb-community@4.2

echo "Starting redis server....."

brew services start redis

echo "Running Node server"

npm run dev


