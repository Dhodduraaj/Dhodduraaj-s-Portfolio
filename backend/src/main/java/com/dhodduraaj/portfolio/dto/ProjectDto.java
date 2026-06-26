package com.dhodduraaj.portfolio.dto;

import java.util.List;

public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private List<String> techStack;
    private List<String> keyFeatures;
    private String githubLink;
    private String liveLink;
    private String imageKey;

    public ProjectDto() {}

    public ProjectDto(Long id, String title, String description, List<String> techStack, List<String> keyFeatures, String githubLink, String liveLink, String imageKey) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.keyFeatures = keyFeatures;
        this.githubLink = githubLink;
        this.liveLink = liveLink;
        this.imageKey = imageKey;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }
    public List<String> getKeyFeatures() { return keyFeatures; }
    public void setKeyFeatures(List<String> keyFeatures) { this.keyFeatures = keyFeatures; }
    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    public String getLiveLink() { return liveLink; }
    public void setLiveLink(String liveLink) { this.liveLink = liveLink; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
}
