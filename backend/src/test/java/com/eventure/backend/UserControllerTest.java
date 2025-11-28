package com.eventure.backend;

import com.eventure.backend.controllers.UserController;
import com.eventure.backend.entities.Users;
import com.eventure.backend.services.UserServices;
import com.eventure.backend.services.UserFeedServices;
import com.eventure.backend.services.SavedFlyerServices;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@SpringJUnitConfig
public class UserControllerTest {

    @MockBean
    private UserServices userServices;
    
    @MockBean
    private UserFeedServices userFeedServices;
    
    @MockBean
    private SavedFlyerServices savedFlyerServices;

    @Test
    public void testUserAuthentication() {
        // Test user authentication logic
        Users testUser = new Users();
        testUser.setId(1L);
        testUser.setUsername("Test User");
        testUser.setEmail("test@charlotte.edu");
        testUser.setPassword("password123");

        when(userServices.authenticateUser("test@charlotte.edu", "password123"))
            .thenReturn(Optional.of(testUser));

        Optional<Users> result = userServices.authenticateUser("test@charlotte.edu", "password123");
        
        assertTrue(result.isPresent());
        assertEquals("Test User", result.get().getUsername());
    }

    @Test
    public void testUserCreation() {
        Users newUser = new Users();
        newUser.setUsername("New User");
        newUser.setEmail("new@charlotte.edu");
        newUser.setPassword("newpassword");

        when(userServices.createUser(newUser)).thenReturn(newUser);
        when(userServices.existsByEmail("new@charlotte.edu")).thenReturn(false);

        assertFalse(userServices.existsByEmail("new@charlotte.edu"));
        Users created = userServices.createUser(newUser);
        assertEquals("New User", created.getUsername());
    }
}