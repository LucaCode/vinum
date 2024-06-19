/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

export namespace Version {

    const VERSION_REGEX = /^([0-9]{1,6})(\.[0-9]{1,6})(\.[0-9]{1,6})$/;

    /**
     * @description
     * Checks if the version value is valid.
     * @param version 
     * @returns 
     */
    export function valid(version: any): boolean {
        return typeof version === "string" && VERSION_REGEX.test(version);
    }

    /**
     * @description
     * Compares two version strings.
     * @param versA 
     * @param versB 
     * @returns 
     */
    export function compare(versA: string, versB: string): number {
        if(!Version.valid(versA) || !Version.valid(versB)) throw new Error('Invalid version strings.');
        if(versA == versB) return 0;
        const partsA = versA.split('.'), partsB = versB.split('.');
        for(let i = 0; i < 3; i++) {
            const numberA = parseInt(partsA[i]), numberB = parseInt(partsB[i]);
            if(numberA > numberB) return 1;
            if(numberA < numberB) return -1;
        }
        return 0;
    }

    /**
     * @description
     * Returns the major (1. part) version number.
     * @param versionStr 
     * @returns 
     */
    export function major(versionStr: string): number {
        return getNumberPart(versionStr,0);
    }

    /**
     * @description
     * Returns the minor (2. part) version number.
     * @param versionStr 
     * @returns 
     */
    export function minor(versionStr: string): number {
        return getNumberPart(versionStr,1);
    }

     /**
     * @description
     * Returns the patch (3. part) version number.
     * @param versionStr 
     * @returns 
     */
    export function patch(versionStr: string): number {
        return getNumberPart(versionStr,2);
    }

    function getNumberPart(versionStr: string, index: number): number {
        if(!Version.valid(versionStr)) throw new Error('Invalid version string.');
        return parseInt(versionStr.split('.')[index]);
    }
}