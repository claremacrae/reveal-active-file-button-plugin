import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import tseslint from 'typescript-eslint';
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
    {
        ignores: ['main.js']
    },
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.js'],
                },
            },
        },
    },
    ...obsidianmd.configs.recommended,
    // Or include English locale files (JSON and TS/JS modules)
    // ...obsidianmd.configs.recommendedWithLocalesEn,

    {
        files: ["src/*.ts"],
        languageOptions: {
            parser: tsparser,
            // parserOptions: { project: "./tsconfig.json" },
        },

        // Optional project overrides
        rules: {
            "obsidianmd/ui/sentence-case": [
                "warn",
                {
                    brands: ["YourBrand"],
                    acronyms: ["OK"],
                    enforceCamelCaseLower: true,
                },
            ],
        },
    },
]);
