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
- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js (for frontend development)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure MySQL database:
   - Create a database named `eventure_db`
   - Update `src/main/resources/application.properties` with your MySQL credentials

3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup
1. Open the HTML files directly in a web browser, or
2. Use a simple HTTP server:
   ```bash
   python -m http.server 3000
   ```
   Then navigate to `http://localhost:3000`

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
