package com.dhodduraaj.portfolio.dto;

import java.util.List;

public class PortfolioDataDto {
    private List<ProjectDto> projects;
    private List<SkillDto> skills;
    private List<AchievementDto> achievements;

    public PortfolioDataDto() {}

    public PortfolioDataDto(List<ProjectDto> projects, List<SkillDto> skills, List<AchievementDto> achievements) {
        this.projects = projects;
        this.skills = skills;
        this.achievements = achievements;
    }

    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }
    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
    public List<AchievementDto> getAchievements() { return achievements; }
    public void setAchievements(List<AchievementDto> achievements) { this.achievements = achievements; }
}
