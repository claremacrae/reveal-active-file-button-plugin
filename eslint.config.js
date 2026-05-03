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
    {
        files: ["src/*.ts"],
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
