# Create a simple nodeJS with MySQL CRUD on a singe entity (model/table) books

# Step 1.
# npm install -g express-generator

# Step 2.
# express --view=ejs books-crud

# Step 3.
# change directory: cd books-crud

# Step 4.
# install dependencies: npm install

# Step 5.
# run the app: SET DEBUG=books-crud:* npm start

# Step 6.
# 1. package.json
# 2. (see npm start) e.g. node ./bin/www
# 3. require('../app)  <-- app.js
# 4. routing --> req --> controllers
# 5. routes --> controllers --> services --> database <-> service <-> controller --> view

# Step 7.
# mkdir ./lib

# Step 8.
# creat file ./lib/db.js

# Step 9.
# npm i mysql2

# Step 10.
# create a connection to db and export it

# Step 11.
# implement the code for ./routes/books.js
# where:
# a) it captures the /books/ request
# b) connects to the database and do A SELECT query
# c) renders the view by sending the title and books rows (as a table) to the view

# Step 12.
# created a new view ./views/books.ejs
# that has axtarma code with <% %> and <%= %> in order to 
# a)execute a simple js code such as a for when using <% %> and 
# b)printing on the view the values when using <%= %>