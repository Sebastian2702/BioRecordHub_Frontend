const bibliographyFieldHelpers = [
    { key: 'key', helperText: 'A unique identifier for this entry (e.g., smith2023).' },
    { key: 'item_type', helperText: 'The type of bibliography item (e.g., book, journal article).' },
    { key: 'publication_year', helperText: 'Year the work was published.' },
    { key: 'author', helperText: 'Name(s) of the author(s), separated by commas.' },
    { key: 'title', helperText: 'The full title of the work.' },
    { key: 'publication_title', helperText: 'Title of the journal or book where it was published.' },
    { key: 'isbn', helperText: 'International Standard Book Number, if applicable.' },
    { key: 'issn', helperText: 'International Standard Serial Number for journals.' },
    { key: 'doi', helperText: 'Digital Object Identifier for the work.' },
    { key: 'url', helperText: 'Link to the online version of the item.' },
    { key: 'abstract_note', helperText: 'A brief summary or abstract of the work.' },
    { key: 'date', helperText: 'Full publication date (e.g., 2023-04-01).' },
    { key: 'date_added', helperText: 'Date the entry was added to your system.' },
    { key: 'date_modified', helperText: 'Last modification date of this entry.' },
    { key: 'access_date', helperText: 'Date when the online item was last accessed.' },
    { key: 'pages', helperText: 'Page range of the article or chapter (e.g., 123–135).' },
    { key: 'num_pages', helperText: 'Total number of pages in the item.' },
    { key: 'issue', helperText: 'Issue number of the journal, if applicable.' },
    { key: 'volume', helperText: 'Volume number of the journal or series.' },
    { key: 'number_of_volumes', helperText: 'Total number of volumes in a multi-volume work.' },
    { key: 'journal_abbreviation', helperText: 'Abbreviated journal name, if used.' },
    { key: 'short_title', helperText: 'A short version or alternate title.' },
    { key: 'series', helperText: 'Name of the series, if part of one.' },
    { key: 'series_number', helperText: 'The number in the series, if applicable.' },
    { key: 'series_text', helperText: 'Additional series information or description.' },
    { key: 'series_title', helperText: 'Full title of the series.' },
    { key: 'publisher', helperText: 'The publisher of the item.' },
    { key: 'place', helperText: 'Location where the item was published (e.g., New York).' },
    { key: 'language', helperText: 'The language the item is written in (e.g., English).' },
    { key: 'rights', helperText: 'Any copyright or rights information.' },
    { key: 'type', helperText: 'Custom type or format description.' },
    { key: 'archive', helperText: 'Name of the archive where the item is stored.' },
    { key: 'archive_location', helperText: 'Location in the archive (box, shelf, etc.).' },
    { key: 'library_catalog', helperText: 'Library catalog where the item can be found.' },
    { key: 'call_number', helperText: 'Library call number for the item.' },
    { key: 'extra', helperText: 'Any additional information or metadata.' },
    { key: 'notes', helperText: 'Personal notes or observations about the item.' },
];

export const getHelperText = (key: string): string | undefined => {
    const field = bibliographyFieldHelpers.find(item => item.key === key);
    return field ? field.helperText : "No helper text available for this field.";
};

export const bibliographyFieldKeys =[
    'isbn', 'issn', 'doi', 'url', 'abstract_note', 'num_pages',
    'issue', 'volume', 'number_of_volumes', 'journal_abbreviation', 'short_title', 'series', 'series_number',
    'series_text', 'series_title', 'publisher', 'place', 'language', 'rights', 'type', 'archive',
    'archive_location', 'library_catalog', 'call_number', 'extra', 'notes'
];