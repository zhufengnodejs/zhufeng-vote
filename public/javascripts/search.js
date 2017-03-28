$(function () {
    let content = getStorage('content');
    $.ajax({
        url:`/vote/index/search?content=${content}`,
        type:'GET',
        dataType:'json',
        success(result){
            console.log(result.data);
            var html = result.data.map(function (item) {
                return parseUser(item);
            }).join('');
            $('.coming').html(html);
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
})