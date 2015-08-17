requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {
    require(['jquery','addr','bootstrap','dialog'], function($,addr) {
        $(function() {

            // 新增模板- 
            $('.show-dialog').click(function() {
                getCtiy();
                $(this).hide();
                $('#city-tip').empty().data('chekCity', "");
                $('#myModal').find('.btn-option').removeClass('hide');
                $('#myModal').find('.btn-edit').addClass('hide');
                $('.table-money').find('.data-edit').addClass('hide');

                $('.btn-close').click(function() {
                    $('.show-dialog').show();
                    $('.table-money').find('.data-edit').removeClass('hide');
                });
            });



            // 选择省份地区
            $('.modal-content').on('click', 'input[type="checkbox"]', function(e) {
                var data_cked, show_item = "";
                switch ($(this).data('type')) {
                    case 1:
                        if ($(this).prop('checked')) {
                            $('.modal-body').find('input[type="checkbox"]').prop('checked', false);
                        }
                        break;
                    case 2:
                        if ($(this).prop('checked')) {
                            $('.modal-header').find('input[type="checkbox"]').prop('checked', false);
                            $(this).parents('dt').next('dd').find('input[type="checkbox"]').prop('checked', true);
                        } else {
                            $(this).parents('dt').next('dd').find('input[type="checkbox"]').prop('checked', false);
                        }
                        break;
                    case 3:
                        if ($(this).prop('checked')) {
                            $('.modal-header').find('input[type="checkbox"]').prop('checked', false);
                        }
                        if ($(this).parents('dd').find('input[type="checkbox"]').length != $(this).parents('dd').find('input[type="checkbox"]:checked').length) {
                            $(this).parents('dd').prev('dt').find('input[type="checkbox"]').prop('checked', false);
                        } else {
                            $(this).parents('dd').prev('dt').find('input[type="checkbox"]').prop('checked', true);
                        }
                        break;
                    default:
                }
                //- 显示选中的地区
                data_cked = getChecked();
                for (var i = 0; i < data_cked.length; i++) {
                    show_item += "<code><span data-id='" + data_cked[i].id + "' data-name='" + data_cked[i].name + "' data-type='" + data_cked[i].type + "'>" + data_cked[i].name + "</span></code>";
                }
                $('#city-tip').html(show_item).data('chekCity', data_cked);
            });

            //- 遍历复选框获取选中地区
            function getChecked() {
                var result = [];
                $('.modal-content input[type="checkbox"]').each(function(i, item) {
                    if ($(this).prop('checked') && $(this).data('type') != '2') {
                        var obj = {
                            'id': this.value,
                            'name': $(this).data('address'),
                            'type': $(this).data('type')
                        };
                        result.push(obj);
                    }
                });
                return result;
            }

            //- 确定选取的所有地区
            $('.btn-option').on('click', function() {
                var new_list, show_item = "",
                    data = $('#city-tip').data('chekCity');
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (i == data.length - 1) {
                            show_item += "<span data-id='" + data[i].id + "' data-name='" + data[i].name + "' data-type='" + data[i].type + "'>" + data[i].name + "</span>";
                        } else {
                            show_item += "<span data-id='" + data[i].id + "' data-name='" + data[i].name + "' data-type='" + data[i].type + "'>" + data[i].name + "</span>,";
                        }
                    }
                    new_list = "<tr><td class='name'>" + show_item + "<a class='edit-link data-edit hide' data-toggle='modal' data-target='#myModal'><nobr>编辑</nobr></a></td>" +
                        "<td class='w-first can-edit'><input class='form-control' name='w-first' value='0'></td>" +
                        "<td class='m-first can-edit'><input class='form-control' name='m-first' value='0'></td>" +
                        "<td class='w-renewal can-edit'><input class='form-control' name='w-renewal' value='0'></td>" +
                        "<td class='m-renewal can-edit'><input class='form-control' name='m-renewal' value='0'></td>" +
                        "<td><a class='optin-link data-save'>保存</a><a class='option-link data-del'>删除</a></td></tr>";
                    $('.table-money').append(new_list);
                    //- $('#myModal').modal('hide');
                } else {
                    alert('请选择地区');
                }
            });

            //- 保存列表数据
            $('.table-money').on('click', '.data-save', function() {
                var this_data = $(this).parents('tr'),
                    this_area = this_data.find('.name');

                this_data.find('.can-edit > input').each(function() {
                    if (!isNaN($(this).val())) {
                        $(this).parent().html(this.value);
                    } else {
                        $(this).parent().html('0');
                    }
                    $(this).remove();
                });
                getListAll();
                $(this).addClass('hide');
                $('.table-money').find('.data-edit').removeClass('hide');
                $('.show-dialog').show();
            });

            //- 编辑数据
            $('.table-money').on('click', '.data-edit', function() {
                var this_data = $(this).parents('tr').find('.name>span'),
                    tips = "";
                getCtiy();
                $('#myModal').find('.btn-edit').removeClass('hide');
                $('#myModal').find('.btn-option').addClass('hide');
                setTimeout(function() {
                    //- 加载数据
                    $('.modal-content').find("input").each(function() {
                        var inp_val = $(this).val(),
                            $inp = $(this);
                        $('#city-tip').find('span').each(function() {
                            var spa_val = $(this).data('id');
                            if (spa_val == inp_val) {
                                $inp.prop('checked', true);
                                return false;
                            } else {
                                $inp.prop('checked', false);
                            }
                        });
                    });
                }, 100);
                this_data.each(function() {
                    tips += "<code><span data-id='" + $(this).data('id') + "' data-name='" + $(this).data('name') + "' data-type='" + $(this).data('type') + "'>" + $(this).data('name') + "</span></code>";
                });
                $('#city-tip').html(tips);

                $('.table-money').find('.data-edit').addClass('hide');

                $('.btn-close').click(function() {
                    $('.show-dialog').show();
                    $('.table-money').find('.data-edit').removeClass('hide');
                });

                //- 保存数据
                $('.btn-edit').data('dom', $(this));
                $('.btn-edit').click(function() {
                    var inp_list = $(this).data('dom').parents('tr').find('.can-edit');
                    inp_list.each(function() {
                        var val = $(this).html();
                        var name = $(this).attr('class').replace(/\s+can-edit/g, ""),
                            inpt = "<input class='form-control' name='" + name + "' value='" + val + "'>";
                        $(this).html(inpt);
                    });
                    var new_list, show_item = "",
                        data = $('#city-tip').data('chekCity');
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (i == data.length - 1) {
                                show_item += "<span data-id='" + data[i].id + "' data-name='" + data[i].name + "' data-type='" + data[i].type + "'>" + data[i].name + "</span>" +
                                    "<a class='edit-link data-edit hide' data-toggle='modal' data-target='#myModal'><nobr>编辑</nobr></a>";
                            } else {
                                show_item += "<span data-id='" + data[i].id + "' data-name='" + data[i].name + "' data-type='" + data[i].type + "'>" + data[i].name + "</span>,";
                            }
                        }
                        $(this).data('dom').parents('tr').find('.data-save').removeClass('hide');
                        $(this).data('dom').parent('.name').html(show_item);
                    } else {
                        alert('请选择地区');
                    }
                });

                $('.btn-close').click(function() {
                    edit_link = "";
                });

            });

            //- 删除列表数据
            $('.table-money').on('click', '.data-del', function() {
                $(this).parents('tr').remove();
                getListAll();
            });

            //- 获取列表所有数据
            function getListAll() {
                var all_data = [],
                    data_one = [],
                    area_all, area_one = [],
                    first_weight, first_money, added_weight, added_money;
                $('.table-money').find('tr').not(':first-child').each(function(i, item) {
                    $(this).find('.name > span').each(function() {
                        area_one.push({
                            "id": $(this).data('id'),
                            "name": $(this).data('name'),
                            "type": $(this).data('type')
                        });
                    });
                    first_weight = $(this).find('.w-first').html();
                    first_money = $(this).find('.m-first').html();
                    added_weight = $(this).find('.w-renewal').html();
                    added_money = $(this).find('.m-renewal').html();
                    data_one.push({
                        "first_weight": first_weight,
                        "first_money": first_money,
                        "added_weight": added_weight,
                        "added_money": added_money,
                        "area": area_one
                    });
                    area_one = [];
                });
                all_data = data_one;
                $('.table-money').data('allList', all_data);
                return all_data;
            }

            //- 从json中获取地区数据
            function getCtiy() {
                $.ajax({
                    type: "get",
                    url: "./city_ajax_json.json",
                    dataType: "json",
                    success: function(data) {
                        var content, dt = "";
                        if (data) {
                            $.each(data, function(i, item) {
                                $.each(data, function(i, item) {
                                    var country = "";
                                    country += "<li><label class='checkbox-inline'><input type='checkbox' name='country' data-type='1' data-address='" + item.name + "' value='" + item.value + "'><span>" + item.name + "</span></label></li>"
                                    var head = "<button class='close' type='button' data-dismiss='modal' aria-label='Close'>" +
                                        "<span aria-hidden='true'>&times;</span></button>" +
                                        "<ul class='list-inline'><span class='panel-headtxt'>选择区域</span>" + country + "</ul>";
                                    $('.modal-header').html(head);
                                    $.each(item.sub, function(i, item) {
                                        var pro, dt_first, ul = "";
                                        pro = item.name;
                                        dt_first = "<label class='checkbox-inline'><input type='checkbox' name='' data-type='2' data-address='" + item.name + "' value='" + item.value + "'><strong>" + item.name + "</strong></label>";
                                        $.each(item.sub, function(i, item) {
                                            ul += "<li data-value='" + item.value + "'>" +
                                                "<label class='checkbox-inline'><input type='checkbox' name='' data-type='3' data-address='" + item.name + "' value='" + item.value + "'><span>" + item.name + "</span><span class='red'></label>" +
                                                "<span class='caret panel-toggle'></span></li>";
                                        });
                                        dt += "<dt>" + dt_first + "<dd><ul class='list-inline'>" + ul + "</ul></dd></dt>";　　
                                    });
                                });
                            });
                            content = "<dl class='dl-panel'>" + dt + "</dt>";
                            $('.modal-body').html(content);
                        } else {
                            $('.modal-body').html("数据加载失败，请刷新页面重试");
                        }
                    },
                    error: function() {
                        $('.modal-body').html("数据加载失败，请刷新页面重试");
                    }
                });
                return false;
            }
        });
    })
})
