package com.example.CoffeeApp.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private static final Logger logger = LoggerFactory.getLogger(KafkaProducerService.class);

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, String emailId, String message) {
        logger.info("******FROM PRODUCER*******");
        kafkaTemplate.send(topic, emailId, message);
        logger.info("Message sent to topic: {}", topic);

    }

}
