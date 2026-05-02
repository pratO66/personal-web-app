package com.resume.model;

public class Skill {
    private String name;
    private String category;
    private int level;

    public Skill() {}

    public Skill(String name, String category, int level) {
        this.name = name;
        this.category = category;
        this.level = level;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }
}
