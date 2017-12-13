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

export default {
    access,
    froala
}
