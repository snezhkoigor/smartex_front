let access = {
    admin: 'admin',
    operator: 'operator',
    public: 'public'
};

let froala = {
    toolbarBottom: true,
    quickInsertButtons: ['image', 'embedly', 'table', 'ul', 'ol', 'hr'],
    toolbarButtons: ['fullscreen', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'embedly', '|', 'insertImage', 'insertLink', 'insertTable', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'color', 'fontFamily', 'fontSize', '|', 'html'],
    height: 200,
    charCounterCount: false,
    // toolbarVisibleWithoutSelection: true,
    // pluginsEnabled: ['quickInsert', 'image', 'table', 'lists'],
    // quickInsertButtons: false
    fontFamilySelection: true,
    fontSizeSelection: true,
    // paragraphFormatSelection: true
}

let pictureInput = {
    accept: 'image/jpeg,image/png',
    customStrings: 'image/jpeg,image/png',
    customStrings: {
        remove: 'Remove',
        change: 'Change'
    },
    removable: true,
    zIndex: 1,
    buttonClass: {
        button: 'flat',
        removeButton: 'flat'
    },
    size: 2,
    margin: 16
}

let perPage = [ 25, 50, 100, {text: 'All', value: -1} ];

export default {
    access,
    froala,
    perPage,
    pictureInput
}