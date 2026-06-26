package com.dhodduraaj.portfolio.loader;

import com.dhodduraaj.portfolio.model.Achievement;
import com.dhodduraaj.portfolio.model.Project;
import com.dhodduraaj.portfolio.model.Skill;
import com.dhodduraaj.portfolio.repository.AchievementRepository;
import com.dhodduraaj.portfolio.repository.ProjectRepository;
import com.dhodduraaj.portfolio.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;

    public DataInitializer(ProjectRepository projectRepository,
                           SkillRepository skillRepository,
                           AchievementRepository achievementRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            initProjects();
        }
        if (skillRepository.count() == 0) {
            initSkills();
        }
        if (achievementRepository.count() == 0) {
            initAchievements();
        }
    }

    private void initProjects() {
        Project dogCommerce = new Project(
                "Supplements Dispatcher: Canine Fuel Hub",
                "Designed and launched a full-stack, rapid-delivery ecommerce web sector optimized for procuring canine nutrients and performance fuels, featuring robust payment grids.",
                Arrays.asList("React", "Node.js", "Express.js", "MongoDB", "Razorpay", "Resend Email", "Cloudinary", "Google OAuth"),
                Arrays.asList(
                        "Programmed a secure transaction grid supporting Google OAuth and Razorpay checkout channels.",
                        "Formulated transactional automated receipts via Resend Email, surviving query spikes.",
                        "Constructed an administrative dashboard for supply drops, stock tracking, and orders."
                ),
                "https://github.com/Dhodduraaj",
                null,
                "dog-ecommerce"
        );

        Project smartWallet = new Project(
                "Smart Web-Wallet: Expense Scanner",
                "A high-performance personal financial scanner providing instant spending analytics, multi-account transfers, and secure PWA mobile-ready operations.",
                Arrays.asList("Spring Boot", "React", "PostgreSQL (Neon)", "Tailwind CSS", "PWA", "Android APK"),
                Arrays.asList(
                        "Engineered a Spring Boot REST API layer mapped to Neon PostgreSQL for real-time transactions.",
                        "Constructed responsive dashboards visualizing spending vectors and balance limits.",
                        "Compiled a custom Android APK interface supporting mobile field operations."
                ),
                "https://github.com/Dhodduraaj",
                null,
                "smart-wallet"
        );

        Project wellbeingPlatform = new Project(
                "Zen-Spider: Cognitive Wellbeing AI",
                "An AI-powered cognitive companion utilizing Google Gemini AI for mental health scanning, sentiment tracing, and wellness logs.",
                Arrays.asList("React", "Node.js", "Express.js", "MongoDB", "Google Gemini AI", "Tailwind CSS"),
                Arrays.asList(
                        "Integrated Google Gemini LLM API to process cognitive text logs and return support prompts.",
                        "Engineered real-time expression checks using front-facing camera vectors.",
                        "Constructed a secure MongoDB storage module with instant sentiment summary logs."
                ),
                "https://github.com/Dhodduraaj",
                null,
                "wellbeing"
        );

        projectRepository.saveAll(Arrays.asList(dogCommerce, smartWallet, wellbeingPlatform));
    }

    private void initSkills() {
        // Backend
        skillRepository.save(new Skill("Java", "Backend", 90));
        skillRepository.save(new Skill("Spring Boot", "Backend", 85));
        skillRepository.save(new Skill("Node.js", "Backend", 80));
        skillRepository.save(new Skill("Express.js", "Backend", 80));

        // Frontend
        skillRepository.save(new Skill("React", "Frontend", 85));
        skillRepository.save(new Skill("HTML", "Frontend", 95));
        skillRepository.save(new Skill("CSS", "Frontend", 90));
        skillRepository.save(new Skill("JavaScript", "Frontend", 85));

        // Databases
        skillRepository.save(new Skill("PostgreSQL", "Databases", 80));
        skillRepository.save(new Skill("MongoDB", "Databases", 85));

        // Tools
        skillRepository.save(new Skill("Git", "Tools", 85));
        skillRepository.save(new Skill("IntelliJ IDEA", "Tools", 90));
        skillRepository.save(new Skill("VS Code", "Tools", 90));
        skillRepository.save(new Skill("GitHub", "Tools", 85));

        // Design
        skillRepository.save(new Skill("Figma", "Design", 85));
        skillRepository.save(new Skill("Framer", "Design", 80));
        skillRepository.save(new Skill("Blender", "Design", 75));
    }

    private void initAchievements() {
        achievementRepository.save(new Achievement(
                "Double Academic Honor Shield",
                "Awarded twice for top-tier academic excellence (2023-2024 & 2024-2025) at Kongu Engineering College.",
                "Academic",
                "2023 - 2025"
        ));

        achievementRepository.save(new Achievement(
                "BYTS-India Hackathon Finalist Medal",
                "Ranked 6th nationally in the BYTS-India Hackathon, cracking complex algorithmic nodes and data structures under clock stress.",
                "Hackathon",
                "2024"
        ));

        achievementRepository.save(new Achievement(
                "HackGeniX-2025 Top 10 Plaque",
                "Clawed into the Top 10 national teams at Sathyabama University HackGeniX-2025, deploying scalable systems.",
                "Hackathon",
                "2025"
        ));

        achievementRepository.save(new Achievement(
                "Ideathon AI Prototype Prize",
                "Captured 2nd place in the college Ideathon POC event by engineering a real-time 'AI Driven Water Quality Classifier'.",
                "Hackathon",
                "2024"
        ));

        achievementRepository.save(new Achievement(
                "Oracle Professional Credentials",
                "Cleared certification criteria for Oracle Cloud Infrastructure (OCI) AI Foundations, Generative AI Professional, and OCI Data Science.",
                "Certification",
                "2024"
        ));

        achievementRepository.save(new Achievement(
                "NPTEL Specialized Credentials",
                "Acquired credentials in Human-Computer Interaction Design & Implementation, Affective Computing, and OSN Privacy & Security.",
                "Certification",
                "2024"
        ));
    }
}
