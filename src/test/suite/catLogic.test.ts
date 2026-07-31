import * as assert from 'assert';

function getNonce(): string {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

interface CatState {
	image: string;
	message: string;
}

function getCatState(numProblems: number): CatState {
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

suite('getNonce()', () => {
	test('returns a string of exactly 32 characters', () => {
		assert.strictEqual(getNonce().length, 32);
	});

	test('contains only alphanumeric characters [A-Za-z0-9]', () => {
		assert.match(getNonce(), /^[A-Za-z0-9]{32}$/);
	});

	test('generates unique values on repeated calls', () => {
		const nonces = new Set(Array.from({ length: 50 }, () => getNonce()));
		assert.ok(nonces.size > 1, 'Expected unique nonces across multiple calls');
	});
});


suite('getCatState() – image selection per tier', () => {
	const cases: Array<[number, string]> = [
		[0,   '0errors.png'],
		[1,   '3errors.png'],
		[2,   '3errors.png'],
		[3,   '40errors.png'],
		[5,   '40errors.png'],
		[6,   '10errors.png'],
		[9,   '10errors.png'],
		[10,  '15errors.png'],
		[14,  '15errors.png'],
		[15,  '20errors.png'],
		[24,  '20errors.png'],
		[25,  '25errors.png'],
		[34,  '25errors.png'],
		[35,  '30errors.png'],
		[49,  '30errors.png'],
		[50,  '35errors.png'],
		[100, '35errors.png'],
	];

	for (const [count, expectedImage] of cases) {
		test(`${count} error(s) → ${expectedImage}`, () => {
			assert.strictEqual(getCatState(count).image, expectedImage);
		});
	}
});

suite('getCatState() – message selection', () => {
	test('every tier representative returns a non-empty message', () => {
		for (const n of [0, 1, 3, 6, 10, 15, 25, 35, 50]) {
			assert.ok(getCatState(n).message.length > 0, `Expected non-empty message for ${n} errors`);
		}
	});

	test('each tier returns a distinct message', () => {
		const messages = [0, 1, 3, 6, 10, 15, 25, 35, 50].map(n => getCatState(n).message);
		assert.strictEqual(new Set(messages).size, messages.length, 'Expected all tier messages to be unique');
	});
});

suite('getCatState() – boundary transitions', () => {
	const boundaries: Array<[number, number]> = [
		[2,  3],
		[5,  6],
		[9,  10],
		[14, 15],
		[24, 25],
		[34, 35],
		[49, 50],
	];

	for (const [below, at] of boundaries) {
		test(`image changes at boundary ${below} → ${at}`, () => {
			assert.notStrictEqual(
				getCatState(below).image,
				getCatState(at).image,
				`Expected different images at boundary between ${below} and ${at}`
			);
		});
	}
});
