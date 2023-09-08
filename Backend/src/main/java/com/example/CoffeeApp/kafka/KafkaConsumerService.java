package com.example.CoffeeApp.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.CoffeeApp.services.email.EmailService;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);

    @Autowired
    private EmailService emailService;

    public KafkaConsumerService(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(id = "myId", topics = "order-notification")
    public void listen(ConsumerRecord<String, String> record) {
        logger.info("**********FROM CONSUMER*********");
        logger.info("Received message from topic: {}", record.topic());
        logger.info("Key: {}", record.key());
        logger.info("Value: {}", record.value());

        emailService.sendEmail(record.key(), "Order Completed",
                record.value());

    }

}
