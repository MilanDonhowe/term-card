# Term Cards

No data-store note card sharing web-app.

This is a simple Vue.js app which allows users to share a collection of notecards by encoding notecards as a JSON object which then undergoes LZMA compression into a base64 encoded URL.  In other words, all data is stored in the URL, not in a server.  As such anyone would be able to view [my notecard set here](https://milandonhowe.github.io/term-card/index.html#XQAAAQAfAgAAAAAAAAAtnsBHQ2R5WksnmQWYP4Pg9UxL8BZIkW/ML1rOsQu4C/zWUYc+TBNYrlJIdtgpqKKa6qzqDwMEIcIUO9NwvDrfIbk7ZdYwn9DNL5uFtvQC//8Z/1FptPkZ+8W1dzWxxoy9yGxJwQhU/k3Nkt70+jo2x3Tyh5YWI2f3mwz93IkVXPKT8h8f2gN4+FxJ3aKKh4ALRbLiY9nE7yNx471v0Gp/w/ksJG3f/Wi5qQ==).

Bulma was used as the CSS framework for styling elements.

## Attributions

A lot of different sources were used in developing this web-app, most egregiously from Topaz's paste web-app which I ripped the LZMA compression to URL decoding and encoding algorithms from.  Furthermore the LZMA compression implementation was obtained from a public library which converted the LZMA compression algorithm to javascript.  Finally, liberal use of the Vue and Bluma documentation was used in developing this application.  

Here is an itemized list of the above sources:
1. [Topaz's Paste Repo](https://github.com/topaz/paste)
2. [Rugg's LZMA library (LZMA-JS)](https://github.com/LZMA-JS/LZMA-JS) (© 2016 Nathan Rugg nmrugg@gmail.com) -> MIT attribution
3. [Vue.js Documentation](https://vuejs.org/v2/guide/)
4. [Bulma Documentation](https://bulma.io/documentation/)
