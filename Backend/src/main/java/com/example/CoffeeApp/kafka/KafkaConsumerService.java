package com.example.CoffeeApp.kafka;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerService.class);

    @KafkaListener(id = "myId", topics = "order-notification")
    public void listen(String in) {
        logger.info("**********FROM CONSUMER*********");
        logger.info(in);
    }

}
