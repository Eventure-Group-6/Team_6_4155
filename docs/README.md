# Team_6_4155 - Eventure

Eventure is a college club and event discovery platform that allows students to discover clubs, view event flyers, and interact with organizations.

## Team Roles:

- **Laurence Thompson**: Developer
- **Lane Dial**: Developer  
- **Emmanuel D**: Leader, Developer
- **Souleymane Ndao**: Developer, SCRUM Master
- **Ta'Nyha (Tee) Peoples**: Developer
- **Vijayvenkat Madapakula**: Developer

## Build Instructions:

### Prerequisites

#### Required Software:
1. **Java 21 or higher**
   - Download from: https://adoptium.net/
   - Verify: `java -version`

2. **Maven 3.6+**
   - Download from: https://maven.apache.org/download.cgi
   - Or install via package manager:
     - macOS: `brew install maven`
     - Ubuntu: `sudo apt install maven`
   - Verify: `mvn -version`

3. **Python 3.x**
   - Usually pre-installed on macOS/Linux
   - Windows: Download from https://python.org/
   - Verify: `python --version` or `python3 --version`

#### Optional:
- **Git** (to clone repository)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Quick Start

#### 1. Start Backend (H2 Database)
```bash
cd backend
mvn spring-boot:run
```
Backend runs on: **http://localhost:8080**

#### 2. Start Frontend Server
```bash
cd frontend
python -m http.server 3000
```
Frontend runs on: **http://localhost:3000**

#### 3. Access Application
Open browser to: **http://localhost:3000/pages/login.html**

### Usage
1. **Create Account**: Click "Create account" on login page
2. **Login**: Use your credentials to access main app
3. **Demo Mode**: Works offline with localStorage when backend is down

### Database
- **H2 Console**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa` (no password)

### Troubleshooting

#### Frontend Server Issues:
- **Python command not found**: Try `python3 -m http.server 3000`
- **Port 3000 in use**: Use different port `python -m http.server 8000`
- **Permission denied**: Run from user directory, not system folders
- **CSS not loading**: Always use HTTP server, never open HTML files directly
- **Server stops**: Run in background with `nohup python -m http.server 3000 &`

#### Backend Issues:
- **Port 8080 in use**: Kill existing processes with `pkill -f java`
- **Maven not found**: Install Maven or use `./mvnw spring-boot:run`
- **Java version error**: Ensure Java 21+ is installed and set as default

#### General Issues:
- **Backend offline**: App works in demo mode with localStorage
- **CORS errors**: Backend must be running for full functionality
- **Blank page**: Check browser console (F12) for JavaScript errors

### Features
- **Authentication**: User login and signup
- **CRUD Operations**: Create, read, update, delete for users, flyers, and organizations
- **User Sessions**: Session management with Spring Security
- **Data Persistence**: MySQL database with JPA/Hibernate
- **Responsive Design**: Mobile-first UI design

### API Endpoints
- `POST /api/login` - User authentication
- `POST /api/signup` - User registration
- `GET /api/flyers` - Get all flyers
- `POST /api/flyers` - Create new flyer
- `GET /api/orgs` - Get all organizations
- `POST /api/orgs` - Create new organization
- `GET /api/session` - Check session status
