$(document).ready(function() {
    var http = require('http');
    var gui = require('nw.gui');
    var win = gui.Window.get();
    var tray = gui.Tray({'title': 'Uestc教育网拨号器', 
        'icon': '../img/icon.png',
        'tooltip': 'Uestc教育网拨号器'
    });
    var pwdType; // input type of password
    // var server = "http://202.115.254.251/";

    checkNet();
    localStorage.remberPwd = 1;
    $.ajaxSetup({
        timeout: 20000,
        error: function() {
            $('#hint').text('');
            $('.group img').hide();
            if ($('#action').val() === '拨号') {
                $('#error').text('拨号失败，请检查服务器地址');
            }
        }
    });
    $('.group img').hide();

    if (typeof localStorage.server == 'undefined') {
        localStorage.server = 'http://202.115.254.251/'; 
        localStorage.ip = "202.115.254.251";
    }

    $('#ip').val(localStorage.ip);

    if (localStorage.uid != '') {
        $('#uid').val(localStorage.uid);
        $('#pwd').val(localStorage.pwd);
    }

    $("#showpwd").on("click", function() {
        $(this).is(':checked') ? pwdType = 'text' : pwdType = 'password';
        $('#pwd').attr('type', pwdType)
    });

    $('#remberpwd').on('click', function() {
        $(this).is(':checked') ? localStorage.remberPwd = 1 : localStorage.remberPwd = 0;    
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $('#error').text('');
        if (/\d+\.\d+\.\d+\.\d+/.test($('#ip').val())) {
            submitData(); 
        } else {
            alert('服务器地址错误');
        }
    });

    function submitData() {
        $('.group img').show();
        localStorage.ip = $('#ip').val();
        localStorage.server = 'http://' + localStorage.ip + '/';
        if (Number(localStorage.remberPwd)) {
            localStorage.uid = $('#uid').val();
            localStorage.pwd = $('#pwd').val();
        } else {
            localStorage.uid = '';
            localStorage.pwd = '';
        }
        xhr($('#action').val());
    };

    function xhr(action) {
        if (action === '拨号') {
            $('#hint').text('正在拨号 ');
            // $.post('http://202.115.254.251/', 
            $.post(localStorage.server, 
                {
                    'DDDDD': $('#uid').val(),
                    'upass': $('#pwd').val(),
                    '0MKKey': "%B5%C7%C2%BC+Login"
                },
                function() {
                    checkNet(function() {
                        if ($('#action').val() != '注销') {
                            $('#error').text('用户名或密码错误');
                        }
                        $('#hint').text('');
                        $('.group img').hide();
                    });
                }
            );
        } else {
            $('#hint').text('正在退出 ');
            // $.get('http://202.115.254.251/F.htm', {}, function() {
            $.get(localStorage.server + 'F.htm', {}, function() {
                $('#action').val('拨号');
                $('#hint').text('');
                $('.group img').hide();
            });
        }
    }

    function checkNet(callback) {
        http.get('http://www.baidu.com/', function(res) {
            if (res.statusCode != 200) {
                $('#action').val('拨号');
            } else {
                $('#action').val('注销');
            }
            if (callback && callback instanceof Function) {
                callback();
            }
        });
    }

    // 定义窗口事件
    win.on('close', function() {
        if ($('#action').val() == '注销') {
            if (confirm('帐号还未下线，确认退出？')) {
                this.close(true);
            }
        } else {
            this.close(true);
        }
    });

    // win.on('minimize', function() {
    //     this.hide();
    // });

    // tray.on('click', function() {
    //     this.show();
    // });
})

