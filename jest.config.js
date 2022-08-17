module.exports = {
    /**
     * 1.
     * Add the preset @shelf/jest-mongodb to tell Jest that it should use the npm module
     * we downloaded to apply some predefined settings for using the in-memory MongoDB
     */
    preset: "@shelf/jest-mongodb",

    /**
     * 2.
     * Define that the ./jest.setup.ts file should be run after the Jest environment was set up.
     * This setup file will contain the ramp up/down of the in-memory MongoDB
     */
    setupFilesAfterEnv: ["./jest.setup.js"],
    watchPathIgnorePatterns: ["<rootDir>/globalConfig.json"],
    // testMatc
}
