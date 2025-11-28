package com.eventure.backend.services;

import com.eventure.backend.entities.Comments;
import com.eventure.backend.repositories.CommentRepo;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServices {

    private final CommentRepo commentRepo;

    public CommentServices(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    public Comments createComment(Comments comment) {
        return commentRepo.save(comment);
    }
    
    public List<Comments> getAllComments() {
        return commentRepo.findAll();
    }
    
    public Optional<Comments> getCommentById(Long id) {
        return commentRepo.findById(id);
    }
    
    public List<Comments> getCommentsByFlyerId(Long flyerId) {
        return commentRepo.findByFlyerId(flyerId);
    }
    
    public void deleteComment(Long id) {
        commentRepo.deleteById(id);
    }
}