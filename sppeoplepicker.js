var SPPP = (function () {
    function initSingle (fieldId, schema) {
        if (!schema) {
            schema = {
                PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
                SearchPrincipalSource: 15,
                ResolvePrincipalSource: 15,
                AllowMultipleValues: false,
                MaximumEntitySuggestions: 50,
                Width: '371px'
            };
        }

        SPClientPeoplePicker_InitStandaloneControlWrapper(fieldId, null, schema);
    }

    function initMulti (fieldId, schema) {
        if (!schema) {
            schema = {
                PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
                SearchPrincipalSource: 15,
                ResolvePrincipalSource: 15,
                AllowMultipleValues: true,
                MaximumEntitySuggestions: 50,
                Width: '371px'
            };
        }

        SPClientPeoplePicker_InitStandaloneControlWrapper(fieldId, null, schema);
    }

    function setValue (fieldId, userValues) {
        var ppDiv = $('div[id^="' + fieldId + '_"]');
        var ppEditor = ppDiv.find('.sp-peoplepicker-editorInput');
        var spPP  = SPClientPeoplePicker.SPClientPeoplePickerDict[ppDiv[0].id];
        var value = '';

        $(userValues).each(function (index, userValue) {
            value = userValue;
            ppEditor.val(value);
            spPP.AddUnresolvedUserFromEditor(true); 
        });
    }

    function getValue (fieldId) {
        var ppDiv = $('div[id^="' + fieldId + '_"]');
        var ppEditor = ppDiv.find('.sp-peoplepicker-editorInput');
        var spPP  = SPClientPeoplePicker.SPClientPeoplePickerDict[ppDiv[0].id]; 
        var users = spPP.GetAllUserInfo();
        var userArray = [];

        $(users).each(function (index, user) {
            userArray.push(user);
        });

        return userArray;
    }

    function readOnly (fieldId, readonly) {
        var ppDiv = $('div[id^="' + fieldId + '_"]');
        var delImages = ppDiv.find('.sp-peoplepicker-delImage');
        var eInput = ppDiv.find('.sp-peoplepicker-editorInput');

        if (readonly) {
            delImages.hide();
            eInput.prop('disabled',true);
        }
        else {
            delImages.show();
            eInput.prop('disabled',false);
        }
    }

    function clear (fieldId) {
        var ppDiv = $('div[id^="' + fieldId + '_"]');
        var rList = ppDiv.find('.sp-peoplepicker-resolveList').children();

        $(rList).each(function (index, span) {
            SPClientPeoplePickerProcessedUser.DeleteProcessedUser(span);
        });
    }
  
    function onChange (fieldId, event) {
        var ppDiv = $('div[id^="' + fieldId + '_"]');
        var rList = ppDiv.find('.sp-peoplepicker-resolveList');
        $(rList).bind("DOMSubtreeModified",event);
    }

    return {
        InitSingle: initSingle,
        InitMulti: initMulti,
        SetValue: setValue,
        GetValue: getValue,
        ReadOnly: readOnly,
        Clear: clear,
        OnChange: onChange
    }
})();
