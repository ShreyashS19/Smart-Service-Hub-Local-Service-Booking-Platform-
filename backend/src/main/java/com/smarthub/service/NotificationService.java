package com.smarthub.service;

import com.smarthub.entity.Notification;
import com.smarthub.exception.ResourceNotFoundException;
import com.smarthub.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
    
    public List<Notification> getNotificationsByReceiverId(Integer receiverId) {
        return notificationRepository.findByReceiverIdOrderByCreatedAtDesc(receiverId);
    }
    
    public List<Notification> getUnreadNotifications(Integer receiverId) {
        return notificationRepository.findByReceiverIdAndStatusOrderByCreatedAtDesc(receiverId, "UNREAD");
    }
    
    public Long getUnreadCount(Integer receiverId) {
        return notificationRepository.countByReceiverIdAndStatus(receiverId, "UNREAD");
    }
    
    public Notification markAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notification.setStatus("READ");
        return notificationRepository.save(notification);
    }
    
    public void markAllAsRead(Integer receiverId) {
        List<Notification> notifications = notificationRepository.findByReceiverIdAndStatusOrderByCreatedAtDesc(receiverId, "UNREAD");
        notifications.forEach(n -> n.setStatus("READ"));
        notificationRepository.saveAll(notifications);
    }
    
    public void deleteNotification(Integer notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
