package com.eventure.backend.controllers;

import com.eventure.backend.dtos.CommentRequestDto; 
import com.eventure.backend.entities.Comments;
import com.eventure.backend.services.InteractionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class commentController {

    private final commentController commentService;

    public commentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{flyerId}/comments")
    public ResponseEntity<Comments> addComment(
        @PathVariable Long flyerId,
        @RequestBody CommentRequestDto commentRequestDto) {

        Comments createdComment = commentService.addComment(flyerId, commentRequestDto);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }


    public String getContent() {
        return content;
    }   
    public void setContent(String content) {
        this.content = content;
    }
    public Instant getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
