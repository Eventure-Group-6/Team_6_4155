# Eventure Project Structure

## Directory Layout

```
Team_6_4155/
├── backend/                    # Spring Boot backend application
│   ├── src/main/java/         # Java source code
│   ├── src/main/resources/    # Configuration files
│   ├── target/                # Compiled classes
│   └── pom.xml               # Maven dependencies
├── frontend/                  # Frontend web application
│   ├── pages/                # HTML pages
│   │   ├── main.html         # Main dashboard
│   │   ├── login.html        # Login page
│   │   ├── signup.html       # Registration page
│   │   ├── discussion.html   # Discussion board
│   │   ├── index.html        # Events page
│   │   └── clubProfile.html  # Club profile page
│   ├── assets/               # Static assets
│   │   ├── css/             # Stylesheets
│   │   │   └── styles.css   # Main stylesheet
│   │   └── js/              # JavaScript files (future)
│   ├── components/           # Reusable components (future)
│   └── .gitignore           # Frontend git ignore
├── docs/                     # Project documentation
│   ├── README.md            # Project overview
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── Design.pdf           # Design documents
│   ├── UML.pdf             # UML diagrams
│   └── HELP.md             # Help documentation
└── PROJECT_STRUCTURE.md     # This file
```

## Running the Application

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend/pages
python -m http.server 3000
```

## Key Changes Made

1. **Separated frontend and backend** into distinct directories
2. **Organized frontend assets** with proper CSS/JS structure
3. **Consolidated documentation** into docs/ folder
4. **Removed duplicate files** and folders
5. **Updated path references** in HTML files to match new structure
6. **Prepared for future expansion** with components/ and js/ directories

This structure follows modern web development best practices and makes the project more maintainable.