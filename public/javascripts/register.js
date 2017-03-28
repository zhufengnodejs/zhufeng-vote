$(function(){
  $('.rebtn').click(function(){
      let username = $('.reinput').val();
      let initial_password = $('.initial_password').val();
      let confirm_password = $('.confirm_password').val();
      let mobile = $('.mobile').val();
      let description = $('.description').val();
      let gender = $("input[name=gender]:checked").val();
      if(username == ''){
          alert('用户名不能为空');return false;
      }
      if(!(initial_password == confirm_password && /^[a-zA-Z0-9]{1,10}$/.test(initial_password))){
          alert('密码只能是字母或者数字且不能超过10个字符');return false;
      }
      var password = initial_password;
      if(!/^\d{11}$/.test(mobile)){
          alert('手机号只能是11位的数字');return false;
      }
      if(description == "" || description.length>20){
          alert('描述不能为空且不能超过20个字符');return false;
      }
      $.ajax({
          url:'/vote/register/data',
          type:'POST',
          dataType:'json',
          data:{username,password,mobile,description,gender},
          success(result){
               if(result.errno == 0){//成功
                    var user = {id:result.id};
                    setUser(user);
                    location =  "/vote/index";
               }
          }
      })


  });
});