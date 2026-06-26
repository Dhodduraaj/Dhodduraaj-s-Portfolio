package com.dhodduraaj.portfolio.service.impl;

import com.dhodduraaj.portfolio.dto.AchievementDto;
import com.dhodduraaj.portfolio.dto.PortfolioDataDto;
import com.dhodduraaj.portfolio.dto.ProjectDto;
import com.dhodduraaj.portfolio.dto.SkillDto;
import com.dhodduraaj.portfolio.model.Achievement;
import com.dhodduraaj.portfolio.model.Project;
import com.dhodduraaj.portfolio.model.Skill;
import com.dhodduraaj.portfolio.repository.AchievementRepository;
import com.dhodduraaj.portfolio.repository.ProjectRepository;
import com.dhodduraaj.portfolio.repository.SkillRepository;
import com.dhodduraaj.portfolio.service.PortfolioService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PortfolioServiceImpl implements PortfolioService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;

    public PortfolioServiceImpl(ProjectRepository projectRepository,
                                SkillRepository skillRepository,
                                AchievementRepository achievementRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
    }

    @Override
    public PortfolioDataDto getPortfolioData() {
        List<ProjectDto> projects = projectRepository.findAll().stream()
                .map(this::convertToProjectDto)
                .collect(Collectors.toList());

        List<SkillDto> skills = skillRepository.findAll().stream()
                .map(this::convertToSkillDto)
                .collect(Collectors.toList());

        List<AchievementDto> achievements = achievementRepository.findAll().stream()
                .map(this::convertToAchievementDto)
                .collect(Collectors.toList());

        return new PortfolioDataDto(projects, skills, achievements);
    }

    private ProjectDto convertToProjectDto(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechStack(),
                project.getKeyFeatures(),
                project.getGithubLink(),
                project.getLiveLink(),
                project.getImageKey()
        );
    }

    private SkillDto convertToSkillDto(Skill skill) {
        return new SkillDto(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel()
        );
    }

    private AchievementDto convertToAchievementDto(Achievement achievement) {
        return new AchievementDto(
                achievement.getId(),
                achievement.getTitle(),
                achievement.getDescription(),
                achievement.getCategory(),
                achievement.getDate()
        );
    }
}
