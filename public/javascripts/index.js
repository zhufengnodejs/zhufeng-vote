let offset = 0;
let limit = 10;
let total = 0;
$(function () {
    $.ajax({
        url: `/vote/index/data?offset=${offset}&limit=${limit}`,
        dataType: 'json',
        success(result){
            offset += limit;
            total = result.data.total;
            var html = result.data.objects.map(function (item) {
                return parseUser(item);
            }).join('');
            $('.coming').append(html);
        }
    })
    loadMore({
        callback: function (load) {
            if(offset<total){
                $.ajax({
                    url: `/vote/index/data?offset=${offset}&limit=${limit}`,
                    dataType: 'json',
                    success(result){
                        offset += limit;
                        var html = result.data.objects.map(function (item) {
                            return parseUser(item);
                        }).join('');
                        setTimeout(function () {
                            $('.coming').append(html);
                            load.reset();
                        })
                    }
                })
            }else{
                load.complete();
                setTimeout(function () {
                    load.reset();
                });
            }

        }
    })
    $('.coming').on('click','.btn',function(){
          let user = getUser();
          if(user){
              var id = $(this).data('id');
              $.ajax({
                  url:`/vote/index/poll?id=${id}&voterId=${user.id}`,
                  type:'GET',
                  dataType:'json',
                  context:this,
                  success(result){
                    alert(result.msg);
                    if(result.errno == 0){
                        var voteDiv = $(this).siblings('.vote').children('span');

                        var vote = voteDiv.text();
                        var times = vote.match(/(\d+)票/)[1];
                        voteDiv.text(`${parseInt(times)+1}票`)
                    }
                  }
              })
          }else{
             $('.mask').show();
          }
    })
    $('.sign_in').click(function(){
        $('.mask').show();
        var user = getUser();
        if(user){
            $('.no_signed').hide();
            $('.signed .username').html(user.username);
        }else{
            $('.subbtn').click(function(){
                 var id = $('.usernum').val();
                 var password = $('.user_password').val();
                 var user = {id,password};
                 $.ajax({
                     url:'/vote/index/info',
                     type:'POST',
                     dataType:'json',
                     data:user,
                     success(result){
                         user.username = result.user.username;
                         setUser(user);
                         alert('登录成功');
                         location.reload(true);
                     }
                 })
            });
        }
    });
    $('.dropout').click(function(){
        clearUser();
        location.reload();
    });
    $('.mask').click(function(event){
        if(event.target.className == 'mask')
            $(this).hide();
    });
    var user = getUser();
    if(user){
        $('.register')
            .html('个人主页')
            .click(function () {
                location = `/vote/detail/${user.id}`;
            })


    }
    $('.search span').click(function () {
        var content = $('.search input').val();
        setStorage('content',content);
        location = '/vote/search';
    });
});
