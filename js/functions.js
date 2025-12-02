/*
    FRM PREFIX
*/

function prefix_frm(event, prefix){  
    if(event.target.value.indexOf(prefix) !== 0 ){
        event.target.value = prefix + event.target.value;
    }

    $(event.target).on('keydown keyup keypress blur change', function (e) {
        if (e.keyCode == 8 && $(event.target).is(":focus") && $(event.target).val().length < prefix.length + 1) {
            e.preventDefault();
        }
    });

    $(event.target).on('blur', function (e) {
        if($(event.target).val() == prefix) {
            $(event.target).val('');
        }
    });
}

/* 
    FRM RULES
*/

function isValidPesel(pesel) {
    if (typeof pesel !== "string") return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
        sum += parseInt(pesel.substring(i, i + 1)) * weight[i];
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
}

function isValidRegon(regon) {
    var reg = /^[0-9]{9}$/;
    if (!reg.test(regon)) return false;
    else {
        var digits = ("" + regon).split("");
        var checksum = (8 * parseInt(digits[0]) + 9 * parseInt(digits[1]) + 2 * parseInt(digits[2]) + 3 * parseInt(digits[3]) + 4 * parseInt(digits[4]) + 5 * parseInt(digits[5]) + 6 * parseInt(digits[6]) + 7 * parseInt(digits[7])) % 11;
        if (checksum == 10) checksum = 0;

        return parseInt(digits[8]) == checksum;
    }
}

function is_date(date) {
    var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (reg.test(date) == false) {
        return false;
    } else {
        return true;
    }
}

function is_email(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
    var address = email;
    if (reg.test(address) == false) {
        return false;
    } else {
        return true;
    }
}

function isValidNip(nip) {
    if (typeof nip !== "string") return false;

    // Usuń spacje i myślniki
    nip = nip.replace(/[\ \-]/gi, "");

    // Sprawdź czy NIP ma dokładnie 10 cyfr
    if (nip.length !== 10) return false;

    // Sprawdź czy zawiera tylko cyfry
    if (!/^\d+$/.test(nip)) return false;

    // Sprawdź czy nie składa się z samych identycznych cyfr
    if (/^(.)\1{9}$/.test(nip)) return false;

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
        sum += parseInt(nip.substr(i, 1)) * weight[i];
    }

    return sum % 11 === controlNumber;
}

/* 
    FRM PREVENTION
*/

// pozwala na wpisanie tylko cyfr
function validateNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if ((key < 48 || key > 57) && !(key == 8 || key == 9 || key == 13 || key == 37 || key == 39 || key == 46)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

// pozwala na wpisanie wszystkiego poza cyframi
function validateNOTNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 48 || key == 49 || key == 50 || key == 51 || key == 52 || key == 53 || key == 54 || key == 55 || key == 56 || key == 57) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

/* 
    FRM FORMAT
*/

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + " " + num.substring(num.length - (4 * i + 3));

    var wynik = (sign ? "" : "-") + num + " zł netto";

    return wynik;
}

function format_kod_pocztowy(event) {
    var element = event.target.value;
    var txt = element.toString();
    
    if ($(event.target).val().length == 2) {
        var a = txt.substring(0, 2);
        event.target.value = a + "-";
    }
}

/* 
    FRM VALIDATION
*/

function valid_regon(event) {
    var element = event.target.value;
    
    if (!isValidRegon(element)) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny numer REGON";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_pesel(event) {
    var element = event.target.value;

    if (!isValidPesel(element)) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny numer PESEL";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_date(event) {
    var element = event.target.value;

    if (!is_date(element)) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj datę";
        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_radio(event) {
    var element = event.target.name;
    var x = document.getElementsByName(element);
    var i;
    var checked = 0;

    for (i = 0; i < x.length; i++) {
        if (x[i].checked == true) {
            checked++;
        }
    }

    if (checked == 0) {
        document.getElementById("txt-" + event.target.name).innerHTML = "Wybierz opcję";
        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        document.getElementById("txt-" + event.target.name).innerHTML = "";
    }
}

function valid_tel(event) {
    var max_len = 11;
    var phoneNumber = $(event.target).val();

    if (phoneNumber.length !== max_len || !/^\d{3}\s\d{3}\s\d{3}$/.test(phoneNumber) || phoneNumber == "000 000 000" || phoneNumber == "123 456 789" || phoneNumber == "987 654 321") {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny numer";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}


function valid_kod(event) {
    var element = event.target.value;

    if (!element.match(/^\d\d-\d\d\d$/)) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny kod pocztowy 00-000";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_txt(event) {
    if ($(event.target).val() == "") {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Wypełnij poprawnie pole";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_email(event) {
    if ($(event.target).val() == "" || is_email($(event.target).val()) == false) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny email";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_nip(event) {
    var nip = $(event.target).val();

    if (!isValidNip(nip)) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Podaj poprawny NIP";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_message(event) {
    var dane = $(event.target).val();

    if (dane == "") {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Wypełnij pole";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_select(event) {
    if ($(event.target).val() == 0) {
        $(event.target).removeClass("valid-ok").addClass("valid-error");
        document.getElementById("txt-" + event.target.id).innerHTML = "Wybierz opcję";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).removeClass("valid-error").addClass("valid-ok");
        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_agreement(event) {
    if (document.getElementById(event.target.id).checked == false) {
        $(event.target).closest("label").removeClass("valid-disclaimer-ok").addClass("valid-error");
        $(event.target).closest("span").removeClass("valid-disclaimer-ok").addClass("valid-error");

        document.getElementById("txt-" + event.target.id).innerHTML = "Ta zgoda jest wymagana";

        document.getElementById("error-" + event.target.getAttribute('data-form')).value++;
    } else {
        $(event.target).closest("label").removeClass("valid-error").addClass("valid-disclaimer-ok");
        $(event.target).closest("span").removeClass("valid-error").addClass("valid-disclaimer-ok");

        document.getElementById("txt-" + event.target.id).innerHTML = "";
    }
}

function valid_off(event) {
    $(event.target).removeClass("valid-error").addClass("valid-ok");
}

/* 
    VALIDATE
*/


function validate_frm(event) {
    document.getElementById("error-" + event.target.id).value = 0;
    var addEvent = new Event("change");
    var inputs = event.target.elements;
    var ajax = document.getElementById("ajax-" + event.target.id).value;
    
    if ($("#msg-id-" + event.target.id).length > 0) {
        var msg_id = document.getElementById("msg-id-" + event.target.id).value;
    }

    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type != "hidden" && inputs[i].type != "submit") {
            document.getElementById(inputs[i].id).dispatchEvent(addEvent);
        }
    }

    var error = document.getElementById("error-" + event.target.id).value;

    // validate
    if (error > 0) {
        return false;
    } else {
        if(ajax == 'true'){
            var form = $(event.target);
            var actionUrl = form.attr('action');
            
            $.ajax({
                type: "POST",
                url: actionUrl,
                data: form.serialize(),
                success: function(data)
                {
                    $('#' + msg_id).find(".msg_flex").hide();
                    $('#' + msg_id).find(".msg_thx").show();
                }
            });
            
            return false;

        } else {
            return true;
        }
    }
}


/* 
    COOKIES
*/

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();

    exdate.setDate(exdate.getDate() + exdays);

    var c_value = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());

    document.cookie = c_name + "=" + c_value;
}

function set_cookie(name, days) {
    setCookie(name, "accept", days);
    document.getElementById(name).style.display = "none";
}

if ($("#msg_box").length > 0) {
    var inputs = document.getElementById("msg_box").querySelectorAll(".msg_notification");
    for (i = 0; i < inputs.length; i++) {

        if (getCookie(inputs[i].id) == "" || getCookie(inputs[i].id) == null && inputs[i].getAttribute('data-sleep') != 'true') {
            document.getElementById(inputs[i].id).style.display = 'block';
        }

        if (getCookie(inputs[i].id) == "" || getCookie(inputs[i].id) == null && inputs[i].getAttribute('data-sleep') == 'true') {
            var id = inputs[i].id;
            var time = inputs[i].getAttribute('data-delay');
            
            $('#'+id).delay(time).fadeIn();
        }
    }
}

/*
    TIMER
*/

if (typeof compareDate !== 'undefined') {
    var timer;
    //var compareDate = new Date('05 19, 2022 23:59:59'); // Miesiąc Dzień, Rok, Godzina:Minuty:Sekundy
    compareDate.setDate(compareDate.getDate());
    
    timer = setInterval(function() {
      timeBetweenDates(compareDate);
    }, 1000);
}

function timeBetweenDates(toDate) {
  var dateEntered = toDate;
  var now = new Date();
  var difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {

    // Timer done
    clearInterval(timer);
  
  } else {
    
    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    if(days < 10){
        days = '0' + days;
    }

    if(hours < 10){
        hours = '0' + hours;
    }

    if(minutes < 10){
        minutes = '0' + minutes;
    }

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    $("#msg-timer-d").text(days);
    $("#msg-timer-h").text(hours);
    $("#msg-timer-m").text(minutes);
    $("#msg-timer-s").text(seconds);
  }
}

/* 
    OTHER
*/

function faq(id) {
    if (document.getElementById("odp_" + id).style.display == "none") {
        document.getElementById("odp_" + id).style.display = "block";
        document.getElementById("arr_" + id).className = "img_arrow_faq rozwin_arrow_faq";
    } else {
        document.getElementById("odp_" + id).style.display = "none";
        document.getElementById("arr_" + id).className = "img_arrow_faq";
    }
}

function inp_focus(id) {
    document.getElementById(id).focus();
}

function show_hide(id) {
    if (document.getElementById(id).style.display == "none") {
        document.getElementById(id).style.display = "block";
    } else {
        document.getElementById(id).style.display = "none";
    }
}


