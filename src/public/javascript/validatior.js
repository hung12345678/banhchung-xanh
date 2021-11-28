
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
function Validator(options) {
    
    //hàm thực hiện xác nhận
    function validate(inputelement, rule) {
        //lấy được value người dùng nhập
        //lấy được hàm rule.test
        var errtext = inputelement.parentElement.querySelector('.form-item-note');
       
        console.log(errtext);
        var err = rule.test(inputelement.value)
        // nếu có erro thì có lỗi
        if (err) {
            errtext.innerText = err;
            inputelement.classList.add('active')
            errtext.style.color = "red";
        }
        else {
            errtext.innerText = '';
            inputelement.classList.remove('active')
        }
    }


    // console.log(options.rule)
    //lấy element cần của form date
    var formElement = $(options.form);
    var checkoutsuccess = document.querySelector('.checkout-success')
    console.log(checkoutsuccess);
    if (formElement) {
        formElement.onsubmit = function(e){
            // e.preventDefault();
            //thực hiện lặp từng rule và vilidate
            options.rule.forEach(function (rule){    
                var inputelement = formElement.querySelector(rule.s)  
                validate(inputelement, rule)  
            });
            // alert('Đơn hàng đã được tạo thành công')
            checkoutsuccess.classList.add('activeSuccess')
        } 
        // console.log(options.rule)
        options.rule.forEach(function (rule) {
            // lấy ra được select từ mảng rule fullnam, email
            // console.log(rule.s)
            var inputelement = formElement.querySelector(rule.s)
            // console.log(inputelement);
            if (inputelement) {
                // xử lý trường hợp blur ra ngoài
                inputelement.onblur = function () {
                    validate(inputelement,rule)
                }

                //xử lý mỗi khi người dùng nhập 
                inputelement.oninput = function (){
                    var errtext = inputelement.parentElement.querySelector('.form-item-note');
                    errtext.innerText = '';
                    inputelement.classList.remove('active')
                }
            }
        });
    }
    

}
Validator.isRequired = function (selector) {
    return {
        //trả về đúng element fullname  từ Validator.isRequired("#fullname"),
        s: selector,
        //kiểm tra người nhập chưa
        test: function (value) {
            // trim loại bỏ dấu cách ở 2 đầu
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    };
}

Validator.isArress = function (selector) {
    return {
        //trả về đúng element fullname  từ Validator.isEmail("#email"),
        s: selector,
        //kiểm tra người nhập email đúng hay chưa
        // test: function (value) {
        //     var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     return regex.test(value) ? undefined : 'Trường email chưa hợp lệ'
        // }
        test: function (value) {
            // trim loại bỏ dấu cách ở 2 đầu
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    }
}
Validator.isSdt = function(selector){
    return {
        s: selector,
        test: function(value){
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im ;
            return regex.test(value) ? undefined : `Số điện thoại không hợp lệ` 
        }
    }
  
}
