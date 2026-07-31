"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function getCatState(numProblems) {
    switch (true) {
        case numProblems === 0:
            return { image: '0errors.png', message: "purrr-fect the cat is PLEASE,You make the cat very happy!" };
        case numProblems >= 1 && numProblems < 3:
            return { image: '3errors.png', message: "meow... already? we just started. smh my paw my paw " };
        case numProblems >= 3 && numProblems < 6:
            return { image: '40errors.png', message: "oh so ur just winging it huh. bold strategy ngl mrow." };
        case numProblems >= 6 && numProblems < 10:
            return { image: '10errors.png', message: "MEHHHH??? did u even test this or just close ur eyes and pray" };
        case numProblems >= 10 && numProblems < 15:
            return { image: '15errors.png', message: "10 errors. TEN. the cat is not okay. I am not okay. nobody is okay." };
        case numProblems >= 15 && numProblems < 25:
            return { image: '20errors.png', message: "bro cooked and left the stove on MROW WHAT IS THIS." };
        case numProblems >= 25 && numProblems < 35:
            return { image: '25errors.png', message: "MEOOOOHHH ur compiler called. it said it quit. it said goodbye." };
        case numProblems >= 35 && numProblems < 50:
            return { image: '30errors.png', message: "at this point just delete the repo and become a farmer MRRROW." };
        case numProblems >= 50:
            return { image: '35errors.png', message: "50+ errors??? FIFTY??? the cat has ascended. i am beyond disappointment. ur on ur own." };
        default:
            return { image: '0errors.png', message: "purrr-fect the cat is PLEASED, you make the cat very happy!" };
    }
}

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    suite('getNonce()', () => {
        test('returns a string of exactly 32 characters', () => {
            const nonce = getNonce();
            assert.strictEqual(nonce.length, 32);
        });
        test('contains only alphanumeric characters', () => {
            const nonce = getNonce();
            assert.match(nonce, /^[A-Za-z0-9]{32}$/);
        });
        test('produces unique values on repeated calls', () => {
            const nonces = new Set(Array.from({ length: 20 }, () => getNonce()));
            assert.ok(nonces.size > 1, 'Expected unique nonces across multiple calls');
        });
    });
    suite('getCatState() – image selection', () => {
        test('0 errors → 0errors.png', () => {
            assert.strictEqual(getCatState(0).image, '0errors.png');
        });
        test('1 error → 3errors.png (tier 1-2)', () => {
            assert.strictEqual(getCatState(1).image, '3errors.png');
        });
        test('2 errors → 3errors.png (tier 1-2)', () => {
            assert.strictEqual(getCatState(2).image, '3errors.png');
        });
        test('3 errors → 40errors.png (tier 3-5)', () => {
            assert.strictEqual(getCatState(3).image, '40errors.png');
        });
        test('5 errors → 40errors.png (tier 3-5)', () => {
            assert.strictEqual(getCatState(5).image, '40errors.png');
        });
        test('6 errors → 10errors.png (tier 6-9)', () => {
            assert.strictEqual(getCatState(6).image, '10errors.png');
        });
        test('9 errors → 10errors.png (tier 6-9)', () => {
            assert.strictEqual(getCatState(9).image, '10errors.png');
        });
        test('10 errors → 15errors.png (tier 10-14)', () => {
            assert.strictEqual(getCatState(10).image, '15errors.png');
        });
        test('14 errors → 15errors.png (tier 10-14)', () => {
            assert.strictEqual(getCatState(14).image, '15errors.png');
        });
        test('15 errors → 20errors.png (tier 15-24)', () => {
            assert.strictEqual(getCatState(15).image, '20errors.png');
        });
        test('24 errors → 20errors.png (tier 15-24)', () => {
            assert.strictEqual(getCatState(24).image, '20errors.png');
        });
        test('25 errors → 25errors.png (tier 25-34)', () => {
            assert.strictEqual(getCatState(25).image, '25errors.png');
        });
        test('34 errors → 25errors.png (tier 25-34)', () => {
            assert.strictEqual(getCatState(34).image, '25errors.png');
        });
        test('35 errors → 30errors.png (tier 35-49)', () => {
            assert.strictEqual(getCatState(35).image, '30errors.png');
        });
        test('49 errors → 30errors.png (tier 35-49)', () => {
            assert.strictEqual(getCatState(49).image, '30errors.png');
        });
        test('50 errors → 35errors.png (tier 50+)', () => {
            assert.strictEqual(getCatState(50).image, '35errors.png');
        });
        test('100 errors → 35errors.png (tier 50+)', () => {
            assert.strictEqual(getCatState(100).image, '35errors.png');
        });
    });
    suite('getCatState() – message selection', () => {
        test('0 errors has a non-empty message', () => {
            assert.ok(getCatState(0).message.length > 0);
        });
        test('each tier returns a distinct message', () => {
            const tierRepresentatives = [0, 1, 3, 6, 10, 15, 25, 35, 50];
            const messages = tierRepresentatives.map(n => getCatState(n).message);
            const unique = new Set(messages);
            assert.strictEqual(unique.size, messages.length, 'Expected all tier messages to be distinct');
        });
    });
    suite('getCatState() – boundary conditions', () => {
        test('boundary at exactly 3 transitions from tier-1 to tier-2', () => {
            assert.notStrictEqual(getCatState(2).image, getCatState(3).image);
        });
        test('boundary at exactly 6 transitions from tier-2 to tier-3', () => {
            assert.notStrictEqual(getCatState(5).image, getCatState(6).image);
        });
        test('boundary at exactly 10 transitions from tier-3 to tier-4', () => {
            assert.notStrictEqual(getCatState(9).image, getCatState(10).image);
        });
        test('boundary at exactly 15 transitions from tier-4 to tier-5', () => {
            assert.notStrictEqual(getCatState(14).image, getCatState(15).image);
        });
        test('boundary at exactly 25 transitions from tier-5 to tier-6', () => {
            assert.notStrictEqual(getCatState(24).image, getCatState(25).image);
        });
        test('boundary at exactly 35 transitions from tier-6 to tier-7', () => {
            assert.notStrictEqual(getCatState(34).image, getCatState(35).image);
        });
        test('boundary at exactly 50 transitions from tier-7 to tier-8', () => {
            assert.notStrictEqual(getCatState(49).image, getCatState(50).image);
        });
    });
});