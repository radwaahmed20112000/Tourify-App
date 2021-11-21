
# Tourify Mobile App - Design Phase

# App Description 

Tourify is a social app for sharing travel experiences. Users can share the moments of their trips to inspire the other users and help them decide on their next destination. The application provides a way for users to filter trips' posts according to their preferences and interact with other users' posts.


# Requirements Priority


## Functional Requirements



1. Users can sign in and sign up.
2. Keep users signed in after closing the app.
3. Users can view their profile info.
4. Users can create posts and add their trip details. 
5. Users can view their profile posts.
6. Users can view others’ posts in the Feed Screen.
7. Users can filter posts according to Filtering options.
8. Users can view each post and add comments or likes.
9. Users receive push notifications.
10. Users can show their notifications.
11. Users can edit or delete posts.
12. Users can edit or delete comments.
13. Users can delete likes.
14. Users can change profile photos.
15. Real time comments.


## Non-Functional Requirements



1. App provides security for users' info.
2. App responsiveness with any mobile. 
3. App Deployment.


# System Main Components


# Backend:


## Controllers:



* AccountController
* PostController
* ProfileController
* CommentController
* NotificationController


## Services:



* Authorization 
* Filtering: e.g. Location of user


## Model:



* Account
* Post
* Like
* Comment
* Notification
* PushNotifications
* Photo
* Tag
* PostTags


## Routes:



* Acc Routes
* Post Routes  
* Profile Routes
* Comment Routes
* Notification Routes:


# Frontend: 




* Screens :
* Sign in
* Sign up
* Profile 
* Feed
* PostViewer
* Notifications
* PostCreation 
* Components :


##### 	SharedComponents:



* FeedPost 
* PostListView
* NavBar ( Profile, Feed, New Post, and Notifi. )
* TitleBar


##### 	FeedComponents:



* Filter 
* TagsBar

#####   ProfileComponents:

* Info


##### 	PostComponents:



* Comment 
* CommentsList


##### NotificationsComponents:



* Notification
* PushNotification
* GlobalStyling :
* FontNormalization
* Theme

         \
	


	


# Interaction diagrams for the main functionalities


## Sequence Diagrams

Sign Up  
![alt text](http://url/to/img.png)


Sign In 
![alt text](http://url/to/img.png)

Get Account Info  
![alt text](http://url/to/img.png)


Change photo 
![alt text](http://url/to/img.png)


Add comment and push Notification
![alt text](http://url/to/img.png)


Edit comment 
![alt text](http://url/to/img.png)


Delete comment 
![alt text](http://url/to/img.png)


Get Notifications  
![alt text](http://url/to/img.png)


Connect to Network 
![alt text](http://url/to/img.png)


Create Post
![alt text](http://url/to/img.png)


Edit Post
![alt text](http://url/to/img.png)


Delete Post
![alt text](http://url/to/img.png)


Get Post + comments + get likes 
![alt text](http://url/to/img.png)


Get list of post acc to filters
![alt text](http://url/to/img.png)


Like Post
![alt text](http://url/to/img.png)


Delete Like
![alt text](http://url/to/img.png)



## Collaborative Diagram


# Detailed class diagram  :


# CRC cards  :


# ER diagram  : 

