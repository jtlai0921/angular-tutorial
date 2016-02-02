# AngularJS Chat App with Firebase

In this tutorial app, you will build a chat app using AngularJS, with its backend hosted on Firebase.
The app is scaffolded by Yeoman [gulp-angular](https://github.com/Swiip/generator-gulp-angular) generator.

This tutorial is split into five steps. After finishing all these steps, we'll get an live chat app!
Each finished step is tagged in the repo, see the result of `$ git tag`.


# Step0: From the Start:
This is the starting point of this app, which is simply the scaffolding result of `yeoman`.

# Step1: Warm up
In this step, we will build basic UI elements of the app with static data.
The UI elements are:

- A list showing all registered users
- A message list with current chatting user
- An input box which is used to send messages


# Step2: Basic Control Flow with local data
In this step, we will add basic control flows with local data.
We use a service `chatData` to control all the chat data.
All the data are in-memory by now.

- A user can click an item on the left-sided user list to set it as current chat.
- Messages with the selected user will show up on message list.
- A user can send message to others by entring text in the input box and clicking enter.

# Step3: Register/Login via Firebase
In this step, we will add register/login funcationality using [firebase SDK](https://www.firebase.com/docs/web/libraries/angular/guide/user-auth.html).

A non-logged in user will be redirected to a register/login page.
After loggin in, he would be back to the the chat page.

# Step4: Connect data with firebase
In this step, we will replace our in-memory mock data with the real one on firebase.

# Step5: Use different route to handle each user
In this step, we will assign a dedicated URL for each user using [ui-router](https://github.com/angular-ui/ui-router).
So that we can stay at the same page after refreshing browser.
