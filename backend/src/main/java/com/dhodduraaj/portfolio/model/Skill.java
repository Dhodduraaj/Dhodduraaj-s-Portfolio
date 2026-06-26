package com.dhodduraaj.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category; // Backend, Frontend, Databases, Tools, Design
    private int level; // 0-100 percentage for stats

    public Skill() {}

    public Skill(String name, String category, int level) {
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
