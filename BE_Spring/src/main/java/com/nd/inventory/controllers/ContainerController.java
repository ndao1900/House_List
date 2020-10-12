package com.nd.inventory.controllers;

import com.nd.inventory.models.Container;
import com.nd.inventory.repositories.ContainerRepo;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/container")
@Api
public class ContainerController {

    @Autowired
    ContainerRepo containerRepo;

    @GetMapping("")
    public ResponseEntity<List<Container>> getAllContainers(){
        try {
            return new ResponseEntity<>(containerRepo.findAll(), HttpStatus.OK);
        }catch (Exception e){
            System.out.println(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
