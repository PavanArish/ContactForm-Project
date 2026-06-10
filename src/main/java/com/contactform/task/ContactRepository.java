package com.contactform.task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    // JpaRepository gives us save(), findAll(), findById(), delete() etc. for free
}
