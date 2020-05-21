# White Coat Pocket Guide Mobile App 

## Project Description
White Coat Pocket Guide App aims to create a cross-platform mobile
application which provides the Providence residents with the community’s
medical-service information collected by Alpert Medical School.
With the App, users can easily search and find the medical service they
need in the categorized resources. Basically, White Coat Pocket Guide App
serves as a helpful guide to connect the residents to valuable community
resources they may need.

## Demo Video
[demo video link](https://drive.google.com/file/d/10LbiwYbpSisrFJQxSHmLY4NIw77WsVIh/view?usp=sharing)
## Tech Stack
* Front end: React Native (for both Android and iOS)
* Back end: no back end since front end fetch data directly from database
* Database (cloud): MongoDB Atlas


## Features
* Serverless Application (Using MongoDB cloud database, lightweight)
* User Behavior Tracking Mechanism (Recording the user’s option preference)
* Concise UI design (Easy to use, User-friendly)
* Separated administrator portal (Easy to manage the service)

## Front End Architecture

![image](https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/front-end.png)

## Database Structure

![image](https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/db-architecture.png)

## User Behavior Tracking
In order to help administrator to better manage resources, we record the user clicking of every resource item. 
* For users: their clicking behavior will trigger database to update the count field of the selected resource.
* For admins: they would see the total count of each category and resources. However, admin’s clicking would not be added into count.

## Client Portal
### Client Home
The first page displayed to users is a home screen with different categories. Users can lookup for more detail by clicking categoies buttons. If the user is an admin, he can switch to admin platform by clicking **Admin Portal**
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/client-home.png" width=50%>
### Client Service List
This page will fetch all the services of a selected category from MongoDB. Users can see more detail of a service by clicking the service button. If they want to contact the team, they can find contact information after clicking **Contact Us**
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/client-servicelist.png" width=50%>

### Client Resource List
By default users would see the name of each resource. If they click the name, the information like contact info and description will be displayed below.

<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/client-resourcelist.png" width=50%>

### Client Feedback
If users want to comment, they can give their feedback by clicking **Feedback** button

<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/client-feedback.png" width=50%>

## Admin Portal
Users can only log into admin account if they can enter the right admin username and password.
### Admin Login
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-login.png" width=50%>

### Admin Home, Admin Service List and Resource List
These pages have the same layout as Client Home, except they have an additional count of each item.
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-home.png" width=50%>
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-servicelist.png" width=50%>
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-resourcelist.png" width=50%>

### Admin Add Category
Admin can add a new medical service in this page by clicking **Create a Category** in the home page
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-add.png" width=50%>

### Admin Check Feedback
This page will load all the feedback stored in MongoDB
<img src="https://github.com/lymmm412/react_native_mobile_app/blob/master/resource/admin-feedback.png" width=50%>


