package com.eventure.backend.controllers;

import com.eventure.backend.entities.Comments;
import com.eventure.backend.services.CommentServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class commentController {

    private final CommentServices commentServices;

    public commentController(CommentServices commentServices) {
        this.commentServices = commentServices;
    }

    @PostMapping("/flyers/{flyerId}/comments")
    public ResponseEntity<Comments> addComment(
        @PathVariable Long flyerId,
        @RequestBody Map<String, Object> request) {

        Long userId = Long.valueOf(request.get("userId").toString());
        String content = request.get("content").toString();
        
        Comments comment = new Comments(userId, flyerId, content);
        Comments createdComment = commentServices.createComment(comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
    
    @GetMapping("/flyers/{flyerId}/comments")
    public ResponseEntity<List<Comments>> getCommentsByFlyer(@PathVariable Long flyerId) {
        List<Comments> comments = commentServices.getCommentsByFlyerId(flyerId);
        return ResponseEntity.ok(comments);
    }
    
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentServices.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
