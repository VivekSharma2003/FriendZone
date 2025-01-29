# 🌐 **Friendzone**  
![GitHub issues](https://img.shields.io/github/issues/VivekSharma2003/FriendZone)
![GitHub stars](https://img.shields.io/github/stars/VivekSharma2003/FriendZone?style=social)
![License](https://img.shields.io/github/license/VivekSharma2003/FriendZone)
---
    
### 🫂 **A Modern Social Networking Platform**  
    
---
    
## 📖 **Description**  
    
**Friendzone** is a contemporary social network application where users can connect, send friend requests, and manage friendships seamlessly. Built with **React**, **Node.js**, and **MongoDB**, it offers a responsive and dynamic user experience. Whether you're looking to expand your social circle or maintain connections with existing friends, Friendzone provides the tools you need to do so effortlessly.  
    
---
    
## 📂 **File Structure**  

### 🎨 **Frontend**  

    client/
    public/
        index.html
    src/
        components/
            PrivateRoute.tsx
            ...
        contexts/
            AuthContext.tsx
            ...
        pages/
            Home.tsx
            Login.tsx
            Register.tsx
            ...
        App.css
        App.tsx
        index.css
        main.tsx
    package.json
    postcss.config.js
    tailwind.config.js
    tsconfig.app.json
    tsconfig.json
    vite.config.ts
  
---

### 🛠️ **Backend**  

    server/
     models/
        User.js
        ...
     routes/
        auth.js
        friends.js
        users.js
        ...
     middleware/
        auth.js
        ...
     index.js
    package.json
    vercel.json


---

## 🖼️ **Screenshots**  


### 🔐 **Login Page**  
![Login Page](./client/src/img/Login.png)  

### ✍️ **Register Page**  
![Register Page](./client/src/img/Register.png)  

### 🏠 **Home Page**  
![Home Page](./client/src/img/Home.png)  

---
        
## ✨ **Features**  
        
- 🔒 **User Authentication and Authorization**  
- 🤝 **Friend Request System**  
- 🧑‍🤝‍🧑 **Friendship Management**  
- 🔍 **User Search and Filtering**  
- 📱 **Responsive Design**  
- 📢 **Real-time Notifications**    
- 🌐 **Cross-Platform Compatibility**  
        
---
        
## ⚙️ **Installation**  
        
### 🎨 **Frontend**  
        
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/VivekSharma2003/FriendZone.git

2. Navigate to the client directory:  
   
    ```bash
   cd client
  
3. Install dependencies:  
   
    ```bash
   npm install
  
4. Start the development server:  
   
    ```bash
   npm run dev
  

### 🛠️ **Backend**  

1. Clone the repository:  
   
     ```bash
   git clone https://github.com/VivekSharma2003/FriendZone.git
  
2. Navigate to the server directory:  
   
    ```bash
   cd server
  
3. Install dependencies:  
   
    ```bash
   npm install
  
4. Start the development server:  
   
    ```bash
   npm run dev
  
---

## 📡 **API Documentation**  

### 🔑 **Authentication**  

- POST /api/auth/register: Register a new user  
- POST /api/auth/login: Log in an existing user  

### 🤝 **Friends**  

- POST /api/friends/request/:userId: Send a friend request  
- GET /api/friends/requests: View pending requests  
- PUT /api/friends/request/:userId: Accept/Reject requests  
- DELETE /api/friends/:userId: Remove a friend  

### 👥 **Users**  

- GET /api/users/search: Search for users  
- GET /api/users/friends: View a user's friends  

---

## 📜 **License**  

This project is licensed under the **MIT License**. See the LICENSE file for more details.  

---

## 🤝 **Contributing**  

Contributions are always welcome! Feel free to submit a **pull request** with your updates or improvements. 