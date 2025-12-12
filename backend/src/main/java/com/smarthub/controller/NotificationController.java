package com.smarthub.controller;

import com.smarthub.entity.Notification;
import com.smarthub.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification created = notificationService.createNotification(notification);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
   
    @GetMapping("/{receiverId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Integer receiverId) {
        List<Notification> notifications = notificationService.getNotificationsByReceiverId(receiverId);
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/{receiverId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable Integer receiverId) {
        List<Notification> notifications = notificationService.getUnreadNotifications(receiverId);
        return ResponseEntity.ok(notifications);
    }
   
    @GetMapping("/{receiverId}/unread/count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Integer receiverId) {
        Long count = notificationService.getUnreadCount(receiverId);
        return ResponseEntity.ok(Map.of("count", count));
    }
    
    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Integer notificationId) {
        Notification notification = notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(notification);
    }
    
    @PatchMapping("/{receiverId}/read-all")
    public ResponseEntity<String> markAllAsRead(@PathVariable Integer receiverId) {
        notificationService.markAllAsRead(receiverId);
        return ResponseEntity.ok("All notifications marked as read");
    }
    
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable Integer notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted successfully");
    }
}
