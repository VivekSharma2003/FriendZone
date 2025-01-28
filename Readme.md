
# 🌐 **Friend Request**  
---

### 🫂 **A Social Network Application**  

---

## 📖 **Description**  

Friend Request is a modern social network application where users can connect, send friend requests, and manage friendships seamlessly. Built with **React**, **Node.js**, and **MongoDB**, it offers a responsive and dynamic user experience.  

---

## 📂 **File Structure**  

### 🎨 **Frontend**  

```bash
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
```

### 🛠️ **Backend**  

```bash
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
```

---

## 🖼️ **Screenshots**  


### 🔐 **Login Page**  
![Login Page](./client/src/img/login.png)  

### ✍️ **Register Page**  
![Register Page](./client/src/img/register.png)  

### 🏠 **Home Page**  
![Home Page](./client/src/img/home.png)  

---

## ✨ **Features**  

- 🔒 **User Authentication and Authorization**  
- 🤝 **Friend Request System**  
- 🧑‍🤝‍🧑 **Friendship Management**  
- 🔍 **User Search and Filtering**  
- 📱 **Responsive Design**  

---

## ⚙️ **Installation**  

### 🎨 **Frontend**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/friend-request.git
   ```  
2. Navigate to the client directory:  
   ```bash
   cd client
   ```  
3. Install dependencies:  
   ```bash
   npm install
   ```  
4. Start the development server:  
   ```bash
   npm run dev
   ```  

### 🛠️ **Backend**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/friend-request.git
   ```  
2. Navigate to the server directory:  
   ```bash
   cd server
   ```  
3. Install dependencies:  
   ```bash
   npm install
   ```  
4. Start the development server:  
   ```bash
   npm run dev
   ```  

---

## 📡 **API Documentation**  

### 🔑 **Authentication**  

- `POST /api/auth/register`: Register a new user  
- `POST /api/auth/login`: Log in an existing user  

### 🤝 **Friends**  

- `POST /api/friends/request/:userId`: Send a friend request  
- `GET /api/friends/requests`: View pending requests  
- `PUT /api/friends/request/:userId`: Accept/Reject requests  
- `DELETE /api/friends/:userId`: Remove a friend  

### 👥 **Users**  

- `GET /api/users/search`: Search for users  
- `GET /api/users/friends`: View a user's friends  

---

## 📜 **License**  

This project is licensed under the **MIT License**. See the LICENSE file for more details.  

---

## 🤝 **Contributing**  

Contributions are always welcome! Feel free to submit a **pull request** with your updates or improvements.  
