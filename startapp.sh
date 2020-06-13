echo "---------------------------------"
echo "Starting mongodb-community@4.2......"
echo "---------------------------------"
echo brew services start mongodb-community@4.2
echo "---------------------------------"
echo "Starting redis server....."
echo "---------------------------------"
brew services start redis
echo "---------------------------------"
echo "Running Node server"
echo "---------------------------------"
npm run dev
echo "---------------------------------"
