package com.contactform.task1;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ContactController {

    @PostMapping("/contact")
    public String handleContact(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String message) {

        System.out.println("===== New Contact Form Submission =====");
        System.out.println("Name    : " + name);
        System.out.println("Email   : " + email);
        System.out.println("Message : " + message);
        System.out.println("=======================================");

        return "Form submitted successfully!";
    }
}
