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
                    allowDefaultProject: ['*.js', '*.mjs'],
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
    {
        files: ["rollup.config.js", "version-bump.mjs"],
        languageOptions: {
            // Fix error:
            //     'process' is not defined  no-undef
            globals: {
                process: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
        },
    },
]);
