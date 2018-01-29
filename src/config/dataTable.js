export default {
    // [REQUIRED] Set the row height
    rowHeight: '50px',
    // (optional) Title to display
    title: '',
    // (optional) No columns header
    noHeader: false,
    // (optional) Display refresh button
    refresh: false,
    // (optional)
    // User will be able to choose which columns
    // should be displayed
    columnPicker: false,
    // (optional) How many columns from the left are sticky
    // leftStickyColumns: 0,
    // (optional) How many columns from the right are sticky
    // rightStickyColumns: 2,
    // (optional)
    // Styling the body of the data table;
    // "minHeight", "maxHeight" or "height" are important
    // bodyStyle: {
    //     maxHeight: '500px'
    // },
    // (optional) By default, Data Table is responsive,
    // but you can disable this by setting the property to "false"
    responsive: true,
    // (optional) Use pagination. Set how many rows per page
    // and also specify an additional optional parameter ("options")
    // which forces user to make a selection of how many rows per
    // page he wants from a specific list
    pagination: {
        rowsPerPage: 15,
        options: [5, 10, 15, 30, 50, 500]
    },
    // (optional) Select one or more rows for an action
    // "single" adds a column with radio buttons for single row selection
    // "multiple" adds a column with checkboxes for multiple row selection
    // omitting the property will result in no selection column at all
    // selection: 'no',
    // (optional) Override default messages when no data is available
    // or the user filtering returned no results.
    messages: {
        noData: 'No data available to show.',
        noDataAfterFiltering: 'No results. Please refine your search terms.'
    },
    // (optional) Override default labels. Useful for I18n.
    labels: {}
}
