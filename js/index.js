$(document).ready(function() {
    var http = require('http');
    var gui = require('nw.gui');
    var win = gui.Window.get();
    var tray = gui.Tray({'title': 'Uestc教育网拨号器', 
        'icon': '../img/icon.png',
        'tooltip': 'Uestc教育网拨号器'
    });
    var menuBar = require('menuBar');
    var menu = new menuBar(gui);
    gui.Window.get().menu = menu.menu;
    // 宿舍区 202.115.254.251
    // 办公区 202.115.255.243
    // var server = ['http://202.115.254.251/', 'http://202.115.255.243/'];
    localStorage.server = 'http://192.168.9.12/cgi-bin/srun_portal'  
    localStorage.remberPwd = 1;

    // checkNet(function() {
    //     // choose server
    //     http.get(server[0], function(res) {
    //         if (res.statusCode == 200) {
    //             localStorage.server = server[0];
    //         } else {
    //             localStorage.server = server[1];
    //         }
    //     }).end();
    // });
    checkNet()

    // 设置ajax拨号超时行为
    $.ajaxSetup({
        timeout: 20000,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("referer", "http://192.168.9.12/srun_portal.html?&ac_id=2&sys=")
        },
        error: function() {
            $('#hint').text('');
            $('.group img').hide();
            if ($('#action').val() === '拨号') {
                $('#error').text('拨号失败，请检查服务器地址');
            }
        }
    });

    $('.group img').hide();

    if (localStorage.uid != '') {
        $('#uid').val(localStorage.uid);
        $('#pwd').val(localStorage.pwd);
    }

    // hide/show password
    $("#showpwd").on("click", function() {
        var pwdType; // input type of password
        $(this).is(':checked') ? pwdType = 'text' : pwdType = 'password';
        $('#pwd').attr('type', pwdType)
    });

    $('#remberpwd').on('click', function() {
        $(this).is(':checked') ? localStorage.remberPwd = 1 : localStorage.remberPwd = 0;    
    });

    $('form').submit(function(e) {
        e.preventDefault();
        $('#error').text('');
        if ($('#uid').val() != '' && $('#pwd').val() != '') {
            submitData(); 
        } else if ($('#action').val() == '注销') {
            xhr('注销');
            localStorage.uid = '';
            localStorage.pwd = '';
        } else {
            alert('请填写用户名/密码');
            return false;
        }
    });

    function submitData() {
        $('.group img').show();
        if (Number(localStorage.remberPwd)) {
            localStorage.uid = $('#uid').val();
            localStorage.pwd = $('#pwd').val();
        } else {
            localStorage.uid = '';
            localStorage.pwd = '';
        }
        xhr($('#action').val());
    };

    // ajax拨号
    function xhr(action) {
        if (action === '拨号') {
            $('#hint').text('正在拨号 ');
            $.post(localStorage.server, 
                {
                    'username': $('#uid').val(),
                    'password': $('#pwd').val(),
					'action': 'login',
					'ac_id': 2,
					'type': 1,
					'wbaredirect': '',
					'mac': '',
					'user_ip': '',
					'nas_ip': '',
					'pop': 1,
					'is_ldap': 1,
					'nas_init_port': 1
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
            $.get(localStorage.server, {'action': 'logout'}, function() {
                $('#action').val('拨号');
                $('#hint').text('');
                $('.group img').hide();
            });
        }
    }

    // 检查是否已联网
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
        }).end();
    }

})

