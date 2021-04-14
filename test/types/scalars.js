import test from 'ava';
import GraphQL from 'graphql';
import {
  Duration,
  Locale,
  MBID,
  ISWC,
  URLString,
} from '../../src/types/scalars.js';

const { Kind } = GraphQL;

test('Locale scalar allows language code', (t) => {
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'en' }), 'en');
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'jp' }), 'jp');
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'es' }), 'es');
});

test('Locale scalar allows language and country code', (t) => {
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US' }), 'en_US');
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'en_GB' }), 'en_GB');
  t.is(Locale.parseLiteral({ kind: Kind.STRING, value: 'fr_FR' }), 'fr_FR');
});

test('Locale scalar allows language, country, and encoding', (t) => {
  t.is(
    Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US.UTF-8' }),
    'en_US.UTF-8'
  );
  t.is(
    Locale.parseLiteral({ kind: Kind.STRING, value: 'de_CH.utf8' }),
    'de_CH.utf8'
  );
  t.is(
    Locale.parseLiteral({ kind: Kind.STRING, value: 'zh_TW.Big5' }),
    'zh_TW.Big5'
  );
});

test('Locale scalar only accepts strings', (t) => {
  t.is(Locale.parseLiteral({ kind: Kind.INT, value: 5 }), undefined);
  t.is(Locale.parseLiteral({ kind: Kind.ENUM, value: 'xx' }), undefined);
});

test('Locale scalar rejects malformed locales', (t) => {
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_' }), {
    instanceOf: TypeError,
  });
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_USA' }), {
    instanceOf: TypeError,
  });
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'EN' }), {
    instanceOf: TypeError,
  });
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_us' }), {
    instanceOf: TypeError,
  });
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'en-US' }), {
    instanceOf: TypeError,
  });
  t.throws(
    () => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US_foo' }),
    { instanceOf: TypeError }
  );
  t.throws(
    () => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US-utf8' }),
    { instanceOf: TypeError }
  );
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: '12_US' }), {
    instanceOf: TypeError,
  });
  t.throws(() => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US.' }), {
    instanceOf: TypeError,
  });
  t.throws(
    () => Locale.parseLiteral({ kind: Kind.STRING, value: 'en_US.utf!' }),
    { instanceOf: TypeError }
  );
});

test('Duration scalar must be a positive integer', (t) => {
  t.is(Duration.parseLiteral({ kind: Kind.INT, value: 0 }), 0);
  t.is(Duration.parseLiteral({ kind: Kind.INT, value: 1 }), 1);
  t.is(Duration.parseLiteral({ kind: Kind.INT, value: 3000 }), 3000);
  t.is(Duration.parseLiteral({ kind: Kind.STRING, value: '1000' }), undefined);
  t.throws(() => Duration.parseLiteral({ kind: Kind.INT, value: -1 }), {
    instanceOf: TypeError,
  });
  t.throws(() => Duration.parseLiteral({ kind: Kind.INT, value: -1000 }), {
    instanceOf: TypeError,
  });
  t.is(Duration.parseValue(0), 0);
  t.is(Duration.parseValue(1), 1);
  t.is(Duration.parseValue(3000), 3000);
  t.throws(() => Duration.parseValue(-1), { instanceOf: TypeError });
  t.throws(() => Duration.parseValue(-1000), { instanceOf: TypeError });
});

test('URLString scalar must be a valid URL', (t) => {
  t.is(URLString.parseLiteral({ kind: Kind.INT, value: 1000 }), undefined);
  t.is(
    URLString.parseLiteral({
      kind: Kind.STRING,
      value: 'http://www.google.com',
    }),
    'http://www.google.com'
  );
  t.throws(
    () => URLString.parseLiteral({ kind: Kind.STRING, value: 'foo:bar' }),
    { instanceOf: TypeError }
  );
  t.throws(
    () => URLString.parseLiteral({ kind: Kind.STRING, value: 'foo:/bar' }),
    { instanceOf: TypeError }
  );
  t.throws(
    () => URLString.parseLiteral({ kind: Kind.STRING, value: 'foo://bar' }),
    { instanceOf: TypeError }
  );
  t.throws(
    () => URLString.parseLiteral({ kind: Kind.STRING, value: 'foo://bar.' }),
    { instanceOf: TypeError }
  );
});

test('ISWC scalar only accepts strings', (t) => {
  t.is(ISWC.parseLiteral({ kind: Kind.STRING, value: 'foo' }), 'foo');
  t.is(ISWC.parseLiteral({ kind: Kind.INT, value: 5 }), undefined);
  t.is(ISWC.parseLiteral({ kind: Kind.ENUM, value: 'xx' }), undefined);
});

test('ISWC scalar can be any string', (t) => {
  t.is(ISWC.parseValue('foo'), 'foo');
  t.is(ISWC.parseValue('123-456'), '123-456');
  t.is(ISWC.parseValue('!@#$%^&*'), '!@#$%^&*');
});

test('MBID scalar only accepts strings', (t) => {
  t.is(MBID.parseLiteral({ kind: Kind.INT, value: 12345 }), undefined);
  t.is(MBID.parseLiteral({ kind: Kind.ENUM, value: 'xx' }), undefined);
});

test('MBID scalar must be a valid UUID', (t) => {
  t.is(
    MBID.parseLiteral({
      kind: Kind.STRING,
      value: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
    }),
    'c8da2e40-bd28-4d4e-813a-bd2f51958ba8'
  );
  t.throws(
    () =>
      MBID.parseLiteral({
        kind: Kind.STRING,
        value: 'c8da2e40-bd28-4d4e-813a-bd2f51958bag',
      }),
    { instanceOf: TypeError }
  );
});
