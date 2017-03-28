$(function () {
   var id = /\/vote\/detail\/(\d+)/.exec(location)[1];
   $.ajax({
       url:`/vote/all/detail/data?id=${id}`,
       type:'GET',
       dataType:'json',
       success(result){
            var user = result.data;
            $('.personal').html(personInfo(user));
            var friends = user.vfriend.map(function(item){
                return vfriend(item);
            }).join('')
            $('.vflist').html(friends);
       }
   })
})
function vfriend(friend){
    return `
    				<li>
				    <div class="head">
				        <a href="#"><img src="${friend.head_icon}" alt=""></a>
				    </div>
				    <div class="up">
				    	<div class="vote">
				    		<span>投了一票</span>
				    	</div>
				    </div>
				    <div class="descr">
				        <h3>${friend.username}</h3>
				        <p>编号#${friend.id}</p>
				    </div>
				</li>
          `
}
function personInfo(user) {
    return `
    <div class="pl">
					<div class="head">
						<img src="${user.head_icon}" alt="">
					</div>
					<div class="p_descr">
						<p>${user.username}</p>
						<p>编号#${user.id}</p>
					</div>
				</div>
				<div class="pr">
					<div class="p_descr pr_descr">
						<p>${user.rank}名</p>
						<p>${user.vote}票</p>
					</div>
				</div>
				<div class="motto">
					${user.description}
				</div>
           `
}