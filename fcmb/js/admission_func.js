// JS OBFUSCATED

jQuery(function(_0xc6fbx1) {
    'use strict';
    _0xc6fbx1('form#wrapped');
    _0xc6fbx1('#wizard_container')['wizard']({
        stepsWrapper: '#wrapped',
        submit: '.submit',
        beforeSelect: function(_0xc6fbx4, _0xc6fbx5) {
            if (_0xc6fbx1('input#website')['val']()['length'] != 0) {
                return false
            };
            if (!_0xc6fbx5['isMovingForward']) {
                return true
            };
            var _0xc6fbx6 = _0xc6fbx1(this)['wizard']('state')['step']['find'](':input');
            return !_0xc6fbx6['length'] || !!_0xc6fbx6['valid']()
        }
    })['validate']({
        errorPlacement: function(_0xc6fbx2, _0xc6fbx3) {
            if (_0xc6fbx3['is'](':radio') || _0xc6fbx3['is'](':checkbox')) {
                _0xc6fbx2['insertBefore'](_0xc6fbx3['next']())
            } else {
                _0xc6fbx2['insertAfter'](_0xc6fbx3)
            }
        }
    });
    _0xc6fbx1('#progressbar')['progressbar']();
    _0xc6fbx1('#wizard_container')['wizard']({
        afterSelect: function(_0xc6fbx4, _0xc6fbx5) {
            _0xc6fbx1('#progressbar')['progressbar']('value', _0xc6fbx5['percentComplete']);
            _0xc6fbx1('#location')['text']('(' + _0xc6fbx5['stepsComplete'] + '/' + _0xc6fbx5['stepsPossible'] + ')')
        }
    })
})