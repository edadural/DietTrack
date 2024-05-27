// swal.js
import Swal from "sweetalert2";

export function swal(title, text, type, showCancelButton, confirmButtonText, cancelButtonText, okCallBack, cancelCallback) {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
        showCancelButton: showCancelButton,
        confirmButtonColor: '#007BFF',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    }).then(function (result) {
        if (result.isConfirmed) {
            if (typeof okCallBack === 'function') {
                okCallBack();
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            if (typeof cancelCallback === 'function') {
                cancelCallback();
            }
        }
    });
}

export function swalOk(text, okCallBack) {
    swal('İşlem Başarılı', text, 'success', false, 'Tamam', '', okCallBack, () => { });
}

export function swalError(text, callBack) {
    swal('Hata!', text, 'error', false, 'Tamam', '', function () {
        if (typeof callBack === 'function') {
            callBack();
        }
    }, function () { });
}

export function swalQuestion(callback, text) {
    var tip = 'warning';
    if (!text) {
        tip = 'question';
        text = "Bu kayıt silinecek, silmek istediğinize emin misiniz?";
    }
    swal('Emin misiniz?', text, tip, true, 'Devam et', 'Vazgeç', callback, () => { });
}

export async function swalKeepQuestion(okCallback, cancelCallback) {
    var tip = 'question';
    var text = "Ekleme işlemine devam etmek istiyor musunuz?";
    swal('', text, tip, true, 'Devam et', 'Kapat', okCallback, cancelCallback);
}

export function showLoad(_title) {
    if (_title === undefined) {
        _title = 'Lütfen bekleyiniz';
    }
    Swal.fire({
        icon: 'info',
        title: _title,
        allowOutsideClick: false,
        showConfirmButton: false,
        // onOpen: () => {
        //     Swal.showLoading();
        // }
    });
}

export function showOk(_title) {
    if (!_title) {
        _title = 'Başarılı';
    }
    Swal.fire({
        icon: 'success',
        title: _title,
        allowOutsideClick: true,
        showConfirmButton: false,
        // onOpen: () => {
        //     Swal.showLoading();
        // }
    });
}

export function swalClose() {
    Swal.close();
}
