the application has a user registry, it works as follows. There are system users and they have roles, the roles can be Administrator or Client, where an administrator can add roles, delete roles, can also see the list of general products and their respective quantities, as well as add products and modify their quantities, etc. While a user with a customer role (buyers) can only see the quantity of a product and remove quantities of a product.

This is the swagger documentation

http://localhost:3000/api-docs

In the application inside the backend-section there is a test folder in which to implement unit tests with jest to the repositories and services.

There are commented paths and files such as cache in requests, etc. I did it to add more things to the project, but then I commented them out because I didn't really need them.

for creating users for testing
http://localhost:3000/v1/api/auth/seed
but in your local api it is only to change the address for yours, this generates the seeders and creates two users admin and client with role admin and client respectively.


In the application inside the backend-section there is a test folder in which to implement unit tests with jest to the repositories and services.

I hope you like it :)
