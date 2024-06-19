/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import chai from "chai";
import Version from "../src";
chai.should();
chai.use(require("sinon-chai"));

describe('Version Tests', () => {

    describe('Valid function', () => {
        ([
            {version: "", valid: false},
            {version: {}, valid: false},
            {version: "1.0", valid: false},
            {version: "1", valid: false},
            {version: "a.3.1", valid: false},
            {version: "13124324234234.3.1", valid: false},
            {version: "1.0.0", valid: true},
            {version: "1.0.b", valid: false},
            {version: "20.35.13", valid: true},
        ] as {version: any, valid: boolean}[])
        .forEach(({version, valid}, index) => {
            it(`Version test: ${index} should be ${valid ? "valid" : "invalid"}.`, () => {
                chai.assert.equal(Version.valid(version),valid);
            });
        });
    });

    describe('Part getter functions', () => {
        ([
            {version: "1.0.0", major: 1, minor: 0, patch: 0},
            {version: "20.5.6", major: 20, minor: 5, patch: 6},
            {version: "0.0.1", major: 0, minor: 0, patch: 1},
            {version: "200.25.64", major: 200, minor: 25, patch: 64},
        ] as {version: string, major: number, minor: number, patch: number}[])
        .forEach(({version, major, minor, patch}, index) => {
            it(`Version major getter test: ${index} should be ${major}.`, () => {
                chai.assert.equal(Version.major(version),major);
            });
            it(`Version minor getter test: ${index} should be ${minor}.`, () => {
                chai.assert.equal(Version.minor(version),minor);
            });
            it(`Version patch getter test: ${index} should be ${patch}.`, () => {
                chai.assert.equal(Version.patch(version),patch);
            });
        });

        it(`Passing invalid version in getter should throw an error.`, () => {
            chai.expect(() => {
                Version.major("adfdsf");
            }).to.throw();
        });
    });

    describe('Compare function', () => {
        ([
            {versionA: "1.0.0", versionB: "1.0.0", result: 0},
            {versionA: "2.0.0", versionB: "1.0.0", result: 1},
            {versionA: "1.0.0", versionB: "2.0.0", result: -1},
            {versionA: "0.3.1", versionB: "0.2.1", result: 1},
            {versionA: "0.2.1", versionB: "0.3.1", result: -1},
            {versionA: "0.0.3", versionB: "0.0.2", result: 1},
            {versionA: "0.0.2", versionB: "0.0.3", result: -1},
            {versionA: "0.0.1", versionB: "1.0.0", result: -1},
            {versionA: "20.4.1", versionB: "20.3.0", result: 1},
            {versionA: "19.4.1", versionB: "20.3.0", result: -1},
        ] as {versionA: string, versionB: string, result: number}[])
        .forEach(({versionA,versionB,result}, index) => {
            it(`Comparison: ${index} between: ${versionA} and ${versionB} should return ${result}.`, () => {
                chai.assert.equal(Version.compare(versionA,versionB),result);
            });
        });

        it(`Passing invalid version in compare should throw an error.`, () => {
            chai.expect(() => {
                Version.compare("1.0.0","1.0");
            }).to.throw();
        });
    });
});