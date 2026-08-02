# Dataset notice

## Source

- Upstream project: <https://github.com/yduke/love>
- Upstream file: `data.dat`
- Local raw snapshot: `data.dat`
- Raw snapshot SHA-256: `4C074D61DAB32F967E50A87B51AEE0A84235ADEE319D1BEAC267F538B0C7B0C0`

The upstream README states that the sentence data was collected from the
Internet. The upstream repository is MIT-licensed, but that fact alone does
not establish ownership of every individual sentence. Rights in individual
third-party expressions, if any, remain with their respective owners.

## Transformations

`scripts/prepare-data.mjs` performs only reproducible formatting cleanup:

- validates strict UTF-8;
- normalizes line endings;
- removes zero-width formatting characters;
- trims surrounding whitespace;
- removes empty lines;
- rejects duplicate lines;
- assigns a stable content-derived identifier.

For correction or removal requests, open an issue identifying the relevant
line and the basis of the request.
