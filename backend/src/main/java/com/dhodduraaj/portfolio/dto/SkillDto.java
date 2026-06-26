package com.dhodduraaj.portfolio.dto;

public class SkillDto {
    private Long id;
    private String name;
    private String category;
    private int level;

    public SkillDto() {}

    public SkillDto(Long id, String name, String category, int level) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
}
