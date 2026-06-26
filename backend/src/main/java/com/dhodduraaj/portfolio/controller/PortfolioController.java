package com.dhodduraaj.portfolio.controller;

import com.dhodduraaj.portfolio.dto.AchievementDto;
import com.dhodduraaj.portfolio.dto.PortfolioDataDto;
import com.dhodduraaj.portfolio.dto.ProjectDto;
import com.dhodduraaj.portfolio.dto.SkillDto;
import com.dhodduraaj.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {

    private final PortfolioService service;

    public PortfolioController(PortfolioService service) {
        this.service = service;
    }

    @GetMapping("/portfolio/data")
    public ResponseEntity<PortfolioDataDto> getPortfolioData() {
        return ResponseEntity.ok(service.getPortfolioData());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getProjects() {
        return ResponseEntity.ok(service.getPortfolioData().getProjects());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<SkillDto>> getSkills() {
        return ResponseEntity.ok(service.getPortfolioData().getSkills());
    }

    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementDto>> getAchievements() {
        return ResponseEntity.ok(service.getPortfolioData().getAchievements());
    }
}
